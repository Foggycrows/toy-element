import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

/**
 * @description 给组件添加 install 方法
 * @param component 组件参数
 * @returns 带有安装功能的组件
 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name
    app.component(name, component as Plugin)
  }

  return component as SFCWithInstall<T>
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    // 向 app.config.globalProperties 中添加一些全局实例属性或方法
    app.config.globalProperties[name] = fn;
  };
  return fn as SFCWithInstall<T>;
};