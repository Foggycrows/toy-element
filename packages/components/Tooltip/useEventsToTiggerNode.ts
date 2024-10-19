import { each, isElement } from "lodash-es";
import { onMounted, onUnmounted, watch } from "vue";
import type { ComputedRef, Ref, WatchStopHandle } from "vue";
import type { TooltipProps } from "./types";

// 自定义 Hook，用于处理 Tooltip 的事件绑定和解除绑定
export function useEvenstToTiggerNode(
  props: TooltipProps & { virtualTriggering?: boolean }, // Tooltip 配置属性，包含是否虚拟触发
  triggerNode: ComputedRef<HTMLElement | undefined>, // 触发节点的引用
  events: Ref<Record<string, EventListener>>, // 事件监听器集合
  closeMethod: () => void // 关闭 Tooltip 的方法
) {
  // 用于存储观察停止的句柄
  let watchEventsStopHandle: WatchStopHandle | void;
  let watchTriggerNodeStopHandle: WatchStopHandle | void;

  // 存储事件处理函数的映射
  const _eventHandleMap = new Map();

  // 绑定事件到虚拟触发节点
  const _bindEventToVirtualTiggerNode = () => {
    const el = triggerNode.value; // 获取触发节点
    // 确保 el 是一个有效的 DOM 元素
    isElement(el) &&
      each(events.value, (fn, event) => {
        _eventHandleMap.set(event, fn); // 将事件及其处理函数存入映射
        el?.addEventListener(event as keyof HTMLElementEventMap, fn); // 绑定事件
      });
  };

  // 解除绑定事件从虚拟触发节点
  const _unbindEventToVirtualTiggerNode = () => {
    const el = triggerNode.value; // 获取触发节点
    // 确保 el 是一个有效的 DOM 元素
    isElement(el) &&
      each(
        ["mouseenter", "click", "contextmenu"], // 需要解除绑定的事件列表
        (key) =>
          _eventHandleMap.has(key) && // 如果事件在映射中存在
          el?.removeEventListener(key, _eventHandleMap.get(key)) // 解除绑定
      );
  };

  // 组件挂载时执行
  onMounted(() => {
    // 观察 triggerNode 的变化
    watchTriggerNodeStopHandle = watch(
      triggerNode,
      () => props.virtualTriggering && _bindEventToVirtualTiggerNode(), // 如启用虚拟触发，绑定事件
      { immediate: true } // 立即执行
    );

    // 观察 events 的变化
    watchEventsStopHandle = watch(
      events,
      () => {
        if (!props.virtualTriggering) return; // 如果不启用虚拟触发，直接返回
        _unbindEventToVirtualTiggerNode(); // 解除旧事件绑定
        _bindEventToVirtualTiggerNode(); // 绑定新事件
        closeMethod(); // 调用关闭方法
      },
      { deep: true } // 深度监听
    );
  });

  // 组件卸载时执行
  onUnmounted(() => {
    watchTriggerNodeStopHandle?.(); // 停止观察 triggerNode
    watchEventsStopHandle?.(); // 停止观察 events
  });
}

export default useEvenstToTiggerNode;
