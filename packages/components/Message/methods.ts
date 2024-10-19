import type {
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageHandler,
  MessageProps,
  messageType,
} from "./types";
import { messageTypes } from "./types";
import { render, h, shallowReactive, isVNode } from "vue";
import { findIndex, get, each, set, isString } from "lodash-es";
import { useZIndex, useId } from "@toy-element/hooks";
import MessageConstructor from "./Message.vue";

// 存储当前活跃的消息实例
const instances: MessageInstance[] = shallowReactive([]);
const { nextZIndex } = useZIndex();

// 定义默认的消息配置
export const messageDefaults = {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
} as const;

/**
 * @description: 格式化消息参数
 * @param options 
 * @returns 
 */
function normalizeOptions(options: MessageParams): CreateMessageProps {
  const result =
    !options || isVNode(options) || isString(options)
      ? {
          message: options,
        }
      : options;

  return { ...messageDefaults, ...result } as CreateMessageProps;
}

/**
 * @description: 创建消息实例
 * @param props 创建消息的配置
 * @returns 消息实例
 */
function createMessage(props: CreateMessageProps): MessageInstance {
  const id = useId().value;
  const container = document.createElement("div");
  /**
   * @description: 销毁消息实例
   * @returns 
   */
  const destory = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;

    instances.splice(idx, 1);

    render(null, container);
  };

  const _props = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };

  // 创建消息实例的vnode
  const vnode = h(MessageConstructor, _props);
  // 进行渲染
  render(vnode, container);

  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: MessageHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);

  return instance;
}

/**
 * 
 * @param options 
 * @returns 
 */
export const message: MessageFn & Partial<Message> = function (options = {}) {
  const normalized = normalizeOptions(options);
  const instance = createMessage(normalized);

  return instance.handler;
};

/**
 * @description: 获取最后一个消息的底部偏移量
 * @param this 消息配置
 * @returns 偏移量
 */
export function getLastBottomOffset(this: MessageProps) {
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;

  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

/**
 * @description: 关闭所有消息
 * @param type 选择要关闭的消息类型 (可选项)
 */
export function closeAll(type?: messageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close();
      return;
    }
    instance.handler.close();
  });
}
// 循环 messageTypes，为 message 对象的每种消息类型绑定相应的处理函数。这使得可以通过 message.success、message.error 等方式直接调用
each(messageTypes, (type) =>
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type });
  })
);

message.closeAll = closeAll;

export default message as Message;
