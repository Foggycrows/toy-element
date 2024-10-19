<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types';
import { computed, ref, watchEffect, watch, type Ref, onMounted } from 'vue';
import { bind, debounce, isNil, type DebouncedFunc } from 'lodash-es';
import { createPopper, type Instance } from '@popperjs/core';
import { useClickOutside } from '@toy-element/hooks';

import useEventsToTiggerNode from './useEventsToTiggerNode';

defineOptions({
  name: 'ErTooltip'
})

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | void;
  virtualTriggering?: boolean;
}

const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,
})

const emits = defineEmits<TooltipEmits>()
const visible = ref(false)

// 进入触发节点
const events:Ref<Record<string, EventListener>> = ref({})
// 离开触发节点
const outerEvents:Ref<Record<string, EventListener>> = ref({})
// 进入弹出层
const dropdownEvents:Ref<Record<string, EventListener>> = ref({})

// 容器节点
const containerNode = ref<HTMLElement>()
// 弹出层节点
const popperNode = ref<HTMLElement>()
// 触发节点
const _triggerNode = ref<HTMLElement>()

const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return (props.virtualRef as HTMLElement) ?? _triggerNode.value
  }
  return _triggerNode.value as HTMLElement
})

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);

const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);

let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
  closeDebounce?.cancel()
  openDebounce?.()
}

function closeFinal() {
  openDebounce?.cancel()
  closeDebounce?.()
}

/**
 * @description 点击事件切换 tooltip 显示状态
 */
function togglePopper() {
  visible.value ? closeFinal() : openFinal()
}

/**
 * @description 设置tooltip是否可见
 * @param val 是否可见
 */
function setVisible(val: boolean) {
  if (props.disabled) return;
  visible.value = val
  emits("visible-change", val)
}

/**
 * @description 绑定事件
 */
function attachEvents() {
  if (props.disabled || props.manual) return
  if (props.trigger === "hover") {
    events.value["mouseenter"] = openFinal
    events.value["mouseleave"] = closeFinal
    outerEvents.value["mouseleave"] = closeFinal
    dropdownEvents.value["mouseenter"] = openFinal
    return
  }
  if (props.trigger === "click") {
    events.value["click"] = togglePopper
    return
  }
  if (props.trigger === "contextmenu") {
    events.value["contextmenu"] = (e) => {
      e.preventDefault()
      openFinal()
    }
    return
  }
}

let popperInstance: null | Instance

/**
 * @description 销毁popper实例
 */
function destroyPopperInstance() {
  if (isNil(popperInstance)) return

  popperInstance.destroy()
  popperInstance = null
}

/**
 * @description 重置事件
 */
function resetEvents() {
  events.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}

  attachEvents()
}

const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function() {
  openDebounce?.cancel()
  setVisible(false)
}

/**
 * @description 监听 visible 变化 更新popper实例
 */
watch(
  visible,
  (val) => {
    if (!val) return;

    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  { flush: "post" }
);

/** 
 * @description 监听 manual 变化 重置事件
 */
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents()
      return;
    }
    attachEvents();
  }
);

/**
 * @description 监听 trigger 变化 重置事件
 */
watch(
  () => props.trigger,
  (val, oldVal) => {
    if (val === oldVal) return
    openDebounce?.cancel()
    visible.value = false
    emits('visible-change', false)
    resetEvents()
  }
)

onMounted(() => {
  destroyPopperInstance();
})

/**
 * @description 点击外部关闭tooltip
 */
useClickOutside(containerNode, () => {
  emits('click-outside')
  if (props.trigger === "hover" || props.manual) return
  visible.value && closeFinal()
})

/**
 * @description 虚拟节点绑定事件
 */
useEventsToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel()
  setVisible(false)
})

watchEffect(() => {
  if (!props.manual) {
    attachEvents()
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

defineExpose<TooltipInstance>({
  show,
  hide
})
</script>

<template>
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>