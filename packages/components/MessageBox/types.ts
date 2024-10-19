import { type Ref, type VNode } from "vue"; // 从 Vue 导入 Ref 和 VNode 类型
import { type messageType } from "../Message/types"; // 导入 messageType 类型
import { type ButtonType } from "../Button/types"; // 导入 ButtonType 类型

// 定义 MessageBox 的操作类型
export type MessageBoxAction = "confirm" | "cancel" | "close";
// 定义 MessageBox 的类型
export type MessageBoxType = "" | "prompt" | "alert" | "confirm";
// 定义回调函数的类型，接收 MessageBoxAction 或包含值及操作的对象
export type MessageBoxCallback = (
  action: MessageBoxAction | { value: string; action: MessageBoxAction }
) => void;

// 定义输入数据的类型
export type MessageBoxInputData = {
  value: string; // 输入的值
  action: MessageBoxAction; // 对应的操作
};
// 定义 MessageBox 数据类型，包含输入数据和操作
export type MessageBoxData = MessageBoxInputData & MessageBoxAction;

// 定义 MessageBox 的选项接口
export interface MessageBoxOptions {
  title?: string; // 标题
  message?: string | VNode | (() => VNode); // 消息内容，可以是字符串、VNode，或返回 VNode 的函数
  type?: messageType; // 消息类型
  boxType?: MessageBoxType; // MessageBox 类型
  icon?: string; // 图标
  callback?: MessageBoxCallback; // 回调函数
  showClose?: boolean; // 是否显示关闭按钮
  showInput?: boolean; // 是否显示输入框
  showCancelButton?: boolean; // 是否显示取消按钮
  showConfirmButton?: boolean; // 是否显示确认按钮
  cancelButtonText?: string; // 取消按钮文本
  confirmButtonText?: string; // 确认按钮文本
  cancelButtonLoading?: boolean; // 取消按钮加载状态
  confirmButtonLoading?: boolean; // 确认按钮加载状态
  cancelButtonDisabled?: boolean; // 取消按钮禁用状态
  confirmButtonDisabled?: boolean; // 确认按钮禁用状态

  cancelButtonType?: ButtonType; // 取消按钮类型
  confirmButtonType?: ButtonType; // 确认按钮类型
  roundButton?: boolean; // 是否使用圆形按钮

  center?: boolean; // 内容是否居中
  lockScroll?: boolean; // 是否锁定滚动
  closeOnClickModal?: boolean; // 点击模态框是否关闭

  inputPlaceholder?: string; // 输入框占位符
  inputValue?: string; // 输入框的值
  inputType?: "text" | "textarea" | "password" | "number"; // 输入框类型

  buttonSize?: "default" | "small" | "large"; // 按钮大小
  beforeClose?: ( // 关闭前的处理函数
    action: MessageBoxAction,
    instance: MessageBoxOptions,
    done: () => void
  ) => void;
}

// 定义 MessageBox 的属性接口，扩展自 MessageBoxOptions
export interface MessageBoxProps extends MessageBoxOptions {
  visible?: Ref<boolean>; // 显示状态的引用
  doClose(): void; // 关闭方法
  doAction(action: MessageBoxAction, inputVal?: string): void; // 执行操作的方法
  destroy(): void; // 销毁方法
}

// 定义 MessageBox 快捷方法的类型
export type MessageBoxShortcutMethod = ((
  message: MessageBoxOptions["message"], // 消息内容
  title: MessageBoxOptions["title"], // 标题
  options?: MessageBoxOptions // 其他选项
) => Promise<MessageBoxData>) & ((
  message: MessageBoxOptions["message"], // 消息内容
  options?: MessageBoxOptions // 其他选项
) => Promise<MessageBoxData>);

// 定义 IErMessageBox 接口
export interface IErMessageBox {
  (options: MessageBoxOptions | string | VNode): Promise<any>; // 主函数，接受选项、字符串或 VNode，并返回 Promise

  alert: MessageBoxShortcutMethod; // 警告快捷方法
  confirm: MessageBoxShortcutMethod; // 确认快捷方法
  prompt: MessageBoxShortcutMethod; // 提示快捷方法
  close(): void; // 关闭方法
}
