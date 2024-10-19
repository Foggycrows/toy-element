<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { provide, ref, watch, watchEffect } from 'vue';
import { COLLAPSE_CTX_KEY } from './contants';
import { debugWarn } from '@toy-element/utils';

const COMP_NAME = "ErCollapse" as const

defineOptions({
  name: COMP_NAME,
})

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue)


/**
 * @description 点击折叠项的处理
 * @param item 折叠项名称
 */
function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]
  // 手风琴模式的处理
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item]
    updateActiveNames(_activeNames)
    return
  }
  // 普通模式的处理
  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  }  else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

/**
 * @description 更新 activeNames 并触发 change 事件
 * @param newNames 
 */
function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames
  emits("update:modelValue", newNames)
  emits("change", newNames)
}

/**
 * @description 校验 accordion 模式下 activeNames 长度是否大于 1
 */
watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, "accordion mode should only have one active item")
  }
})

/**
 * @description 监听 props.modelValue 变化并更新 activeNames
 */
watch(
  () => props.modelValue,
  (newNames) => updateActiveNames(newNames)
)

/**
 * @description 向子组件提供 activeNames 和 handleItemClick 方法
 */
provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})

</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>