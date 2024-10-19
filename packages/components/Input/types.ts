import type { Ref } from "vue";

// 输入框组件的属性接口
export interface InputProps {
  id?: string; // 输入框的唯一标识符（可选）
  modelValue: string; // 输入框的值，必填
  type?: string; // 输入框的类型，例如 'text', 'password', 等（可选）
  size?: "large" | "small"; // 输入框的大小（可选）
  disabled?: boolean; // 是否禁用输入框（可选）
  clearable?: boolean; // 是否允许清空输入框内容（可选）
  showPassword?: boolean; // 是否显示密码（可选）

  placeholder?: string; // 输入框的占位符（可选）
  readonly?: boolean; // 是否只读（可选）
  autocomplete?: string; // 自动完成功能的建议（可选）
  autofocus?: boolean; // 是否自动获取焦点（可选）

  form?: string; // 关联的表单的唯一标识符（可选）
}

// 输入框组件的事件发出接口
export interface InputEmits {
  (e: "update:modelValue", value: string): void; // 当 modelValue 更新时触发

  (e: "input", value: string): void; // 当输入框值变化时触发
  // 修改值且失去焦点才触发 'change' 事件
  (e: "change", value: string): void; // 当输入框值变化并失去焦点时触发
  (e: "focus", value: FocusEvent): void; // 当输入框获得焦点时触发
  (e: "blur", value: FocusEvent): void; // 当输入框失去焦点时触发
  (e: "clear"): void; // 当输入框被清空时触发
}

// 输入框实例接口
export interface InputInstance {
  ref: Ref<HTMLInputElement | HTMLTextAreaElement | void>; // 引用输入框的 DOM 元素
  focus(): Promise<void>; // 聚焦输入框
  blur(): void; // 失去焦点操作
  select(): void; // 选中输入框内容
  clear(): void; // 清空输入框内容
}
