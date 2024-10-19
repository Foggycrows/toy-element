import type { VNode, ComponentInternalInstance } from "vue";

// 定义消息类型的常量数组，包括信息、成功、警告、危险和错误
export const messageTypes = [
  "info",
  "success",
  "warning",
  "danger",
  "error",
] as const;

// 根据MessageTypes类型定义messageType类型
export type messageType = (typeof messageTypes)[number];

// 定义消息处理器接口
export interface MessageHandler {
  close(): void; // 关闭消息的函数
}

// 定义消息函数类型
export type MessageFn = {
  (props: MessageParams): MessageHandler; // 接收参数并返回一个MessageHandler
  closeAll(type?: messageType): void; // 关闭所有消息，可以指定消息类型
};

// 定义特定消息类型函数
export type MessageTypeFn = (props: MessageParams) => MessageHandler;

// 定义消息接口，包含消息函数和各个类型的消息函数
export interface Message extends MessageFn {
  success: MessageTypeFn; // 成功消息类型的函数
  warning: MessageTypeFn; // 警告消息类型的函数
  info: MessageTypeFn; // 信息消息类型的函数
  danger: MessageTypeFn; // 危险消息类型的函数
  error: MessageTypeFn; // 错误消息类型的函数
}

// 定义消息属性接口
export interface MessageProps {
  id: string; // 消息的唯一标识符
  message?: string | VNode | (() => VNode); // 消息内容，可以是字符串、虚拟节点或返回虚拟节点的函数
  duration?: number; // 显示持续时间
  showClose?: boolean; // 是否显示关闭按钮
  center?: boolean; // 是否居中显示
  type?: messageType; // 消息类型
  offset?: number; // 消息偏移量
  zIndex: number; // 消息的z-index层级
  transitionName?: string; // 过渡动画的名称
  onDestory(): void; // 消息销毁时的钩子函数
}

// 定义消息选项类型，部分省略MessageProps中的id属性
export type MessageOptions = Partial<Omit<MessageProps, "id">>;

// 定义消息参数类型，可以是字符串、虚拟节点或消息选项
export type MessageParams = string | VNode | MessageOptions;

// 定义消息实例接口，包含消息的各个属性
export interface MessageInstance {
  id: string; // 消息的唯一标识符
  vnode: VNode; // 虚拟节点
  props: MessageProps; // 消息属性
  vm: ComponentInternalInstance; // Vue组件实例
  handler: MessageHandler; // 消息处理器
}

// 定义创建消息的属性类型，省略onDestory、id和zIndex
export type CreateMessageProps = Omit<
  MessageProps,
  "onDestory" | "id" | "zIndex"
>;
