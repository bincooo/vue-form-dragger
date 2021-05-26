/**
 * 视图面板右键菜单事件绑定
 * @param config 全局配置
 * @param other 指令 1删除 2设置 3拷贝
 * @param token 令牌
 * @param list 组件描述集合
 */
export function bind(config:any, other:number, token:string, list:any[]) {
  const { mitt, CPKit } = config
  switch(other) {
    case 1:
      mitt.on(`del:${token}`, () => {
        const li = list.filter(item => item.key = token)
        ;(() => (!!li && li.length > 0 ? list.splice(list.indexOf(li[0]), 1) : null))()
      })
      break
    case 2:
      mitt.on(`set:${token}`, (callback:Function) => {
        const li = list.filter(item => item.key = token)
        ;(() => (!!li && li.length > 0 ? callback.call(li[0]) : null))()
      })
      break
    case 3:
      mitt.on(`copy:${token}`, () => {
        const li = list.filter(item => item.key = token)
        if (!!li && li.length > 0) {
          const element = li[0]
          const index = list.indexOf(element)
          list.splice(index, 0, CPKit.copy({}, {
            ...list[index],
            key: `${element.el}-${Date.now()}`
          }))
        }
      })
      break
  }
}

import FormElement from "./form-element.vue"
import InputElement from "./input-element.vue"
export {
  FormElement,
  InputElement
}