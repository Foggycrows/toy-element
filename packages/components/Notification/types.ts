// 从 Vue 中导入所需的类型
import type { VNode, ComponentInternalInstance, Ref } from "vue";

// 定义通知类型的常量数组
export const notificationTypes = [
  "info",
  "success",
  "warning",
  "danger",
] as const;
// 定义通知类型的联合类型
export type notificationType = (typeof notificationTypes)[number];

// 定义通知位置的常量数组
export const notificationPosition = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
// 定义通知位置的联合类型
export type NotificationPosition = (typeof notificationPosition)[number];

// 定义通知的属性接口
export interface NotificationProps {
  title: string; // 通知标题
  id: string; // 通知唯一标识符
  zIndex: number; // 通知的层级值
  position: NotificationPosition; // 通知位置
  type?: "success" | "info" | "warning" | "danger" | "error"; // 通知类型
  message?: string | VNode; // 通知消息内容，可以是字符串或虚拟节点
  duration?: number; // 显示持续时间（毫秒）
  showClose?: boolean; // 是否显示关闭按钮
  offset?: number; // 通知的偏移量
  transitionName?: string; // 过渡动画名称
  icon?: string; // 自定义图标
  onClick?(): void; // 点击通知的回调函数
  onClose?(): void; // 关闭通知的回调函数
  onDestory(): void; // 销毁通知时的回调函数
}

// 定义通知实例接口
export interface NotificationInstance {
  id: string; // 通知唯一标识符
  vnode: VNode; // 虚拟节点
  vm: ComponentInternalInstance; // 组件内部实例
  props: NotificationProps; // 通知属性
  handler: NotificationHandler; // 通知处理程序
}

// 定义创建通知属性的类型，省略特定属性
export type CreateNotificationProps = Omit<NotificationProps, "onDestory" | "id" | "zIndex">;

// 定义通知处理程序接口
export interface NotificationHandler {
  close(): void; // 关闭通知的方法
}

// 定义通知选项类型，省略特定属性且为部分属性
export type NotificationOptions = Partial<Omit<NotificationProps, "id">>;

// 定义通知参数类型，可以是字符串、虚拟节点或通知选项
export type NotificationParams = string | VNode | NotificationOptions;

// 定义通知函数类型
export type NotificationFn = {
  (props: NotificationParams): NotificationHandler; // 传入通知参数并返回通知处理程序
  closeAll(type?: notificationType): void; // 关闭所有通知，可以指定类型
};

// 定义特定类型的通知函数类型
export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler;

// 定义通知接口，包含基本通知函数和不同类型的通知函数
export interface Notification extends NotificationFn {
  success: NotificationTypeFn; // 成功类型通知函数
  warning: NotificationTypeFn; // 警告类型通知函数
  info: NotificationTypeFn; // 信息类型通知函数
  danger: NotificationTypeFn; // 危险类型通知函数
}

// 定义通知组件实例接口
export interface NotificationCompInstance {
  close(): void; // 关闭通知的方法
  bottomOffset: Ref<number>; // 与底部的偏移量
}
