import type { Placement, Options } from '@popperjs/core';

// TooltipProps 接口定义了 Tooltip 组件的属性
export interface TooltipProps {
  content?: string // Tooltip 的内容，类型为可选的字符串
  trigger?: 'hover' | 'click' | 'contextmenu' // 触发 Tooltip 显示的方式，可选值有 hover、click 和 contextmenu
  placement?: Placement // Tooltip 出现的位置，使用 Popper.js 的 Placement 类型
  manual?: boolean // 是否手动控制 Tooltip 的显示/隐藏
  disabled?: boolean // 是否禁用 Tooltip，禁用后 Tooltip 不会显示
  popperOptions?: Partial<Options> // Popper.js 的配置选项，允许部分选项的自定义
  transition?: string // Tooltip 显示和隐藏时的过渡效果，类型为字符串
  showTimeout?: number // 显示 Tooltip 的延迟时间，单位为毫秒
  hideTimeout?: number // 隐藏 Tooltip 的延迟时间，单位为毫秒
}

// TooltipEmits 接口定义了 Tooltip 组件的事件
export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void // 事件：可见性变化，传递一个布尔值表示当前可见状态
  (e: 'click-outside'): void // 事件：点击外部区域触发
}

// TooltipInstance 接口定义了 Tooltip 实例的方法
export interface TooltipInstance {
  show(): void // 显示 Tooltip 的方法
  hide(): void // 隐藏 Tooltip 的方法
}