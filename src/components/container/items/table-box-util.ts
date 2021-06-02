import { assert, is } from "@/utils/obj"

namespace Tbu {
  export function template() {
    return [
      { type: 0, del: false, text: "", style: {} },
      { type: 0, del: false, text: "", style: {} },
      { type: 0, del: false, text: "", style: {} },
      { type: 0, del: false, text: "", style: {} }
    ]
  }

  export function menuHandler(evt: any, self: any) {
    const { config, modelValue: model } = self
    const { offsetLeft, offsetTop } = config.el
    const { pageX, pageY } = evt
    const { meta } = model
    const serial: string = evt.target.getAttribute("serial")
    const menuList = {
      width: "80px",
      list: [
        {
          text: "表格",
          icon: "fa fa-chevron-right",
          list: []
        }
      ]
    }
    const { list }: any = menuList.list[0]
    headMenu(meta, list)
    rowMenu(meta, list, serial)
    colMenu(meta, list, serial)
    mergeMenu(meta, list, self)
    config.showmenu(pageX - offsetLeft - 260 + "px", pageY - offsetTop + "px", model, menuList)
  }
}
export default Tbu

/**
 * 表头菜单
 * @param meta 单元数据
 * @param menuList 菜单集合
 */
function headMenu(meta: any, menuList: any[]) {
  if (Object.keys(meta.head).length === 0) {
    menuList.push({
      text: "添加头",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        const size = Object.keys(meta.body[0]).length
        for (let index = 0; index < size; index++) {
          meta.head.push({ type: 0, del: false, text: "", style: {} })
        }
      }
    })
  } else {
    menuList.push({
      text: "删除头",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        meta.head = []
      }
    })
  }
}

/**
 * 表行菜单
 * @param meta 单元数据
 * @param menuList 菜单集合
 * @param serial 单元格序列
 */
function rowMenu(meta: any, menuList: any[], serial: string) {
  menuList.push({
    text: "添加行",
    icon: "fa fa-question-circle",
    handler(evt: any) {
      const li = []
      const size = Object.keys(meta.body[0]).length
      const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[0]) : 0
      for (let index = 0; index < size; index++) {
        li.push({ type: 0, del: false, text: "", style: {} })
      }
      meta.body.splice(idx + 1, 0, li)
    }
  })
  if (meta.body.length > 1) {
    menuList.push({
      text: "删除行",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[0]) : NaN
        if (serial.indexOf("-") > 0) {
          meta.body.splice(idx, 1)
        } else {
          meta.head = []
        }
      }
    })
  }
}

/**
 * 表列菜单
 * @param meta 单元数据
 * @param menuList 菜单集合
 * @param serial 单元格序列
 */
function colMenu(meta: any, menuList: any[], serial: string) {
  menuList.push({
    text: "添加列",
    icon: "fa fa-question-circle",
    handler(evt: any) {
      if (Object.keys(meta.head).length !== 0) {
        meta.head.push({ type: 0, text: "", style: {} })
      }
      for (let index = 0; index < meta.body.length; index++) {
        const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[1]) : parseInt(serial)
        const li = Object.values(meta.body[index])
        li.splice(idx + 1, 0, { type: 0, del: false, text: "", style: {} })
        meta.body[index] = li
      }
    }
  })
  if (Object.keys(meta.body[0]).length > 1) {
    menuList.push({
      text: "删除列",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[1]) : parseInt(serial)
        if (Object.keys(meta.head).length !== 0) {
          meta.head.splice(idx, 1)
        }
        for (let index = 0; index < meta.body.length; index++) {
          const li = Object.values(meta.body[index])
          li.splice(idx, 1)
          meta.body[index] = li
        }
      }
    })
  }
}

let HAS_EVENT = false
/**
 * 合并单元格菜单
 * @param meta 单元数据
 * @param menuList 菜单集合
 * @param self vue组件实例
 */
function mergeMenu(meta: any, menuList: any[], self: any) {
  const table = self.$el.querySelector("table")
  if (!HAS_EVENT) {
    self.config.el.addEventListener("click", (e: any) => {
      table.onclick = undefined
      table.onmousedown = undefined
      table.onmousemove = undefined
      table.onmouseup = undefined
    })
    HAS_EVENT = true
  }
  const className = "cell-select"
  const evtData: any = {
    enabled: false,
    isbody: true,
    matrix: {
      col1: -1,
      row1: -1,
      col2: -1,
      row2: -1
    }
  }
  let cacheTarget: any = null
  menuList.push({
    text: "合并单元格",
    icon: "fa fa-question-circle",
    handler(evt: any) {
      table.onclick = (e: any) => {
        e.stopPropagation()
        e.returnValue = false
      }
      table.onmousedown = function(e: any) {
        // 鼠标组件按下
        if (e.which === 1) {
          evtData.enabled = true
          const serial: string = e.target.getAttribute("serial")
          evtData.isbody = serial.indexOf("-") > 0
          evtData.matrix.row1 = parseInt(serial.split("-")[0])
          evtData.matrix.col1 = parseInt(serial.split("-")[1])
        }
        e.stopPropagation()
        e.returnValue = false
      }
      table.onmousemove = function(e: any) {
        if (evtData.enabled) {
          const { classList } = e.target
          const serial: string = e.target.getAttribute("serial")
          const row2 = parseInt(serial.split("-")[0])
          const col2 = parseInt(serial.split("-")[1])

          if (cacheTarget != e.target) {
            cacheTarget = e.target
            if (!classList.contains(className)) {
              evtData.matrix.col1 = evtData.matrix.col1 < col2 ? evtData.matrix.col1 : col2
              evtData.matrix.row1 = evtData.matrix.row1 < row2 ? evtData.matrix.row1 : row2
              evtData.matrix.col2 = evtData.matrix.col2 > col2 ? evtData.matrix.col2 : col2
              evtData.matrix.row2 = evtData.matrix.row2 > row2 ? evtData.matrix.row2 : row2
            } else {
              evtData.matrix.row2 = row2
              evtData.matrix.col2 = col2
            }
            //   先清空
            table.querySelectorAll("." + className).forEach((el: any) => {
              el.classList.remove(className)
            })
            //   再渲染
            for (let index = evtData.matrix.row1; index <= row2; index++) {
              for (let idx = evtData.matrix.col1; idx <= col2; idx++) {
                const node = table.querySelector("td[serial='" + index + "-" + idx + "']")
                node.classList.add(className)
              }
            }
          }
        }
      }
      table.onmouseup = function(e: any) {
        if (evtData.enabled) {
          evtData.enabled = false
          table.querySelectorAll("." + className).forEach((el: any) => {
            el.classList.remove(className)
          })
          doMerge(evtData, meta, menuList, self)
          table.onclick = undefined
          table.onmousedown = undefined
          table.onmousemove = undefined
          table.onmouseup = undefined
        }
      }
    }
  })
}

function doMerge(evtData: any, meta: any, menuList: any[], self: any) {
    const table = self.$el.querySelector("table")
    const node = table.querySelector("td[serial='" + evtData.row1 + "-" + evtData.col1 + "']")
    console.log('node ===> ', node)
}
