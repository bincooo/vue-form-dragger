const bindMap:any = {
}

/**
 * 绑定视图面板右键菜单事件
 * @param config 全局配置
 * @param token 令牌
 * @param list 组件描述集合
 */
export function bind(config:any, token:string, list:any[]) {
  (window as any).bindMap = bindMap
  const { mitt, CPKit } = config
  if (!bindMap[token])  bindMap[token] = {}
  bindMap[token].del = () => {
    const li = list.filter(item => item.key === token)
    ;(() => (!!li && li.length > 0 ? list.splice(list.indexOf(li[0]), 1) : null))()
    unbind(config, token)
  }
  mitt.on(`del:${token}`, bindMap[token].del)
  bindMap[token].set = (callback:Function) => {
    const li = list.filter(item => item.key === token)
    ;(() => (!!li && li.length > 0 ? callback.call(li[0]) : null))()
  }
  mitt.on(`set:${token}`, bindMap[token].set)
  bindMap[token].copy = () => {
    const li = list.filter(item => item.key === token)
    if (!!li && li.length > 0) {
      const element = li[0]
      const index = list.indexOf(element)
      const ndata:any = {}
      list.splice(index, 0, CPKit.copy(ndata, {
        ...list[index],
        key: `${element.el}-${Date.now()}`
      }))
      bind(config, ndata.key, list)
      bindList(config, ndata.children)
    }
  }
  mitt.on(`copy:${token}`, bindMap[token].copy)
}

export function bindList(config:any, list:any[]) {
  if (!list) return
  list.forEach(li => {
      bind(config, li.key, list)
      bindList(config, li.children)
    })
}

/**
 * 解除视图面板右键菜单事件
 * @param config 全局配置
 * @param token 令牌
 */
export function unbind(config:any, token:string) {
  const { mitt } = config
  ;(() => (!!bindMap[token].del ? mitt.off(`del:${token}`, bindMap[token].del) : null))()
  ;(() => (!!bindMap[token].set ? mitt.off(`set:${token}`, bindMap[token].set) : null))()
  ;(() => (!!bindMap[token].copy ? mitt.off(`copy:${token}`, bindMap[token].copy) : null))()
  delete bindMap[token]
}

import FormElement from "./form-element.vue"
import InputElement from "./input-element.vue"
export {
  FormElement,
  InputElement
}