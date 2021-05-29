const bindMap: any = {}

/**
 * 绑定视图面板右键菜单事件
 * @param config 全局配置
 * @param list 组件描述集合
 */
export function bind(config: any, list: any[] = []) {
  ;(window as any).bindMap = bindMap
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    if (!bindMap[element.key]) {
      bindMap[element.key] = {}
      innerdel(config, element, list)
      innercopy(config, element, list)
    }
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
    // config.reload()
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
      list.splice(
        index + 1,
        0,
        CPKit.copy(ndata, {
          ...element,
          key: null
        })
      )
      const _element = list[index + 1]
      bind(config, list)
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

/**
 * 拖动组件处理器
 * @param this config全局配置
 * @param other 指令
 * @param evt 事件包装数据
 * @param childList 拖拽容器集合
 * @param nextTick 页面渲染后的回调
 */
export function moveHandler(this: any, other: number, evt: any, childList: any = [], nextTick: Function) {
  const { newIndex: index, item: div } = evt
  const condition = this.condition
  switch (other) {
    case 1: // 开始移动
      break
    case 2: // 结束移动
      break
    case 3: // 移动事件
      const element = evt.draggedContext.element
      // 不能拖出容器外
      if (evt.from !== evt.to) return false
      // 子节点处理
      else {
        const el = evt.to.getAttribute("data-box")
        return !!condition[el] ? condition[el].includes(element.el) : true
      }
    case 4: // add 事件
      // 表单不允许嵌套
      const path = evt.path
      for (let index = 0; index < path.length; index++) {
        const element = path[index]
        if (element.classList.contains("__container-panel_")) break
        if (element.hasAttribute("box") && element.getAttribute("box") === "form") {
          childList.splice(index, 1)
          return false
        }
      }
      // 添加新的元素时绑定事件
      const { CPKit } = this
      const ndata = CPKit.copy(
        {},
        {
          ...childList[index],
          key: `${childList[index].el}-${Date.now()}`
        }
      )
      childList.splice(index, 1, ndata)
      this.active = ndata.key
      bind(this, childList)
      return true
  }
}
