import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots,getCurrentInstance, type VNode } from "vue";

/**
 * @description 遍历节点树，并执行回调函数
 * @param nodes 节点
 * @param cb 回调函数
 * @returns 无 
 */
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
  each(nodes, (node) => {
    isFunction(cb) && cb(node);
    node.children && _dfs(node.children as VNode[], cb);
  });

/**
 * @description 禁用节点样式
 */
export function useDisabledStyle() {
  const nodePropsMap = new Map();

  const instance = getCurrentInstance()!;
  const children = useSlots()?.default?.();

  watchEffect(() => {
    if (!instance.props?.disabled) {
      _dfs(children ?? [], (node) => {
        if (!nodePropsMap.has(node)) return;
        node.props = nodePropsMap.get(node);
      });
      return;
    }
    _dfs(children ?? [], (node) => {
      if (!node?.props) return;

      nodePropsMap.set(node, cloneDeep(node.props));
      node.props = assign(node?.props, {
        style: {
          cursor: "not-allowed",
          color: "var(--er-text-color-placeholder)",
        },
      });
    });
  });
}

export default useDisabledStyle;