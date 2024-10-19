// 设置元素高度为0px
const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
// 设置元素高度为其滚动高度
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
// 设置元素高度为空
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
// 设置元素溢出为隐藏
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
// 设置元素溢出样式为空
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

// 定义过渡事件的处理函数
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 元素进入前的处理
  beforeEnter(el) {
    _setHeightZero(el); // 设置高度为0
    _setOverflowHidden(el); // 设置溢出为隐藏
  },
  // 元素进入时的处理
  enter: (el) => _setHeightScroll(el), // 设置为滚动高度
  // 元素进入后的处理
  afterEnter(el) {
    _setHeightEmpty(el); // 高度设置为空
    _setOverflowEmpty(el); // 溢出样式设置为空
  },
  // 元素离开前的处理
  beforeLeave(el) {
    _setHeightScroll(el); // 设置为滚动高度
    _setOverflowHidden(el); // 设置溢出为隐藏
  },
  // 元素离开的处理
  leave: (el) => _setHeightZero(el), // 设置高度为0
  // 元素离开后的处理
  afterLeave(el) {
    _setHeightEmpty(el); // 高度设置为空
    _setOverflowEmpty(el); // 溢出样式设置为空
  },
};

// 导出过渡事件
export default transitionEvents;
