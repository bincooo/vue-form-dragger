const bindMap: any = {}

/**
 * 绑定视图面板右键菜单事件
 * @param config 全局配置
 * @param list 组件描述集合
 */
export function bind(config: any, list: any[]) {
  if (!list || list.length === 0) return
  ;(window as any).bindMap = bindMap
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    if (!bindMap[element.key]) bindMap[element.key] = {}
    innerdel(config, element, list)
    innercopy(config, element, list)
  }
}

/**
 * 删除事件绑定
 * @param config 全局配置类
 * @param element 元素
 * @param list 元素所在容器
 */
function innerdel(config: any, element: any, list: any[]) {
  const { mitt } = config
  bindMap[element.key].del = () => {
    const index = list.indexOf(element)
    list.splice(index, 1)
    unbind(config, element)
  }
  mitt.on(`del:${element.key}`, bindMap[element.key].del)
}

/**
 * 拷贝事件绑定
 * @param config 全局配置类
 * @param element 元素
 * @param list 元素所在容器
 */
function innercopy(config: any, element: any, list: any[]) {
  const { mitt, CPKit } = config
  bindMap[element.key].copy = () => {
    const li = list.filter((item) => item.key === element.key)
    if (!!li && li.length > 0) {
      const element = li[0]
      const index = list.indexOf(element)
      const ndata: any = {}
      list.splice(index, 0,
        CPKit.copy(ndata, {
          ...element,
          key: `${element.el}-${Date.now()}`
      }))
    }
  }
  mitt.on(`copy:${element.key}`, bindMap[element.key].copy)
  if (element.hasOwnProperty("items")) {
    element.items.forEach((item: any) => bind(config, item.children))
  } else bind(config, element.children)
}

/**
 * 解除视图面板右键菜单事件
 * @param config 全局配置
 * @param token 令牌
 */
export function unbind(config: any, element: any) {
  const { mitt } = config
  ;(() => (!!bindMap[element.key].del ? mitt.off(`del:${element.key}`, bindMap[element.key].del) : null))()
  ;(() => (!!bindMap[element.key].copy ? mitt.off(`copy:${element.key}`, bindMap[element.key].copy) : null))()
  delete bindMap[element.key]
  if (element.hasOwnProperty("items")) {
    element.items?.forEach((item: any) => {
      if (item.hasOwnProperty("children")) {
        item.children?.forEach((el: any) => unbind(config, el))
      }
    })
  } else element.children?.forEach((el: any) => unbind(config, el))
}

import GridElement from "./grid-element.vue"
import FormElement from "./form-element.vue"
import InputElement from "./input-element.vue"
export { GridElement, FormElement, InputElement }
