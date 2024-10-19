import type { Component, ComputedRef, Ref } from "vue"

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info"
export type NativeType = "button" | "submit" | "reset"
export type ButtonSize = "large" | "default" | "small"

export interface ButtonProps {
  tag?: string|Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType // 原生按钮类型
  disabled?: boolean 
  loading?: boolean
  icon?: string
  circle?: boolean // 圆形按钮
  plain?: boolean // 朴素按钮
  round?: boolean // 圆角按钮
  loadingIcon?: string
  autofocus?: boolean
  useThrottle?: boolean // 是否使用节流
  throttleDuration?: number // 节流时间间隔
}

export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}


export interface ButtonEmits {
  (e: 'click', val: MouseEvent): void
}

export interface ButtonInstance {
  ref: Ref<HTMLElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ButtonSize | "">
  type: ComputedRef<ButtonType | "">
}