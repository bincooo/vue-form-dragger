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

const __class_name_ = "cell-selected"
/**
 * 合并单元格菜单
 * @param meta 单元数据
 * @param menuList 菜单集合
 * @param self vue组件实例
 */
function mergeMenu(meta: any, menuList: any[], self: any) {
  const table = self.$el.querySelector("table")
  const hasEvt = ((window as any).__Has_Table_Evt_ = (window as any).__Has_Table_Evt_ || false)
  if (!hasEvt) {
    self.config.el.addEventListener("click", (e: any) => {
      table.onclick = undefined
      table.onmousedown = undefined
      table.onmousemove = undefined
      table.onmouseup = undefined
    })
    ;(window as any).__Has_Table_Evt_ = !hasEvt
  }
  const cacheTableData: any = {
    midRowIndex: 0,
    midColIndex: 0,
    enabled: false,
    tdList: [] // 外层是行，内层是列
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
      // 扫描所有的td
      cacheTableData.tdList = []
      const tdList: any[] = table.querySelectorAll("tr td[serial]")
      tdList.forEach((el) => {
        const sp: any[] = el.getAttribute("serial").split("-")
        const colList: any[] = (cacheTableData.tdList[sp[0]] = cacheTableData.tdList[sp[0]] || [])
        colList.push({ selected: false, el: el })
      })
      table.onmousedown = function(e: any) {
        // 鼠标组件按下
        if (e.which === 1) {
          cacheTableData.enabled = true
          const serial: string = e.target.getAttribute("serial")
          cacheTableData.midRowIndex = parseInt(serial.split("-")[0])
          cacheTableData.midColIndex = parseInt(serial.split("-")[1])
        }
        e.stopPropagation()
        e.returnValue = false
      }
      table.onmousemove = function(e: any) {
        if (cacheTableData.enabled) {
          const serial: string = e.target.getAttribute("serial")
          const rowIndex = parseInt(serial.split("-")[0])
          const colIndex = parseInt(serial.split("-")[1])

          if (cacheTarget != e.target) {
            cacheTarget = e.target
            // 擦除样式
            eraseStyle(cacheTableData.tdList)
            // 选中单元格
            doRowSelect(table, cacheTableData, rowIndex, colIndex)
            // 渲染
            for (const key in cacheTableData.tdList) {
              const element = cacheTableData.tdList[key]
              for (const k in element) {
                const td = element[k]
                if (td.selected) td.el.classList.add(__class_name_)
              }
            }
          }
        }
      }
      table.onmouseup = function(e: any) {
        if (cacheTableData.enabled) {
          cacheTableData.enabled = false
          // 擦除样式
          eraseStyle(cacheTableData.tdList)
          doMerge(cacheTableData, meta, menuList, self)
          table.onclick = undefined
          table.onmousedown = undefined
          table.onmousemove = undefined
          table.onmouseup = undefined
        }
      }
    }
  })
}

/**
 * 擦除样式
 * @param tdList 单元格集合
 */
function eraseStyle(tdList: any[][]) {
  for (const key in tdList) {
    const element = tdList[key]
    for (const k in element) {
      const td = element[k]
      if (td.selected) {
        td.selected = false
        td.el.classList.remove(__class_name_)
      }
    }
  }
}

// 选中行方法
function doRowSelect(table: any, cacheTableData: any, rowIndex: number, colIndex: number) {
  // 选中上半边单元格
  if (cacheTableData.midRowIndex > rowIndex) {
    for (let index = rowIndex; index <= cacheTableData.midRowIndex; index++) {
      doColSelect(table, cacheTableData, cacheTableData.tdList[index], colIndex)
    }
  }
  // 选中中间的单元格
  else if (cacheTableData.midRowIndex === rowIndex) {
    doColSelect(table, cacheTableData, cacheTableData.tdList[rowIndex], colIndex)
  }
  // 选中下半边单元格
  else {
    for (let index = cacheTableData.midRowIndex; index <= rowIndex; index++) {
      doColSelect(table, cacheTableData, cacheTableData.tdList[index], colIndex)
    }
  }
}

// 选中列方法
function doColSelect(table: any, cacheTableData: any, colList: any[], colIndex: number) {
  // 选中左边单元格
  if (cacheTableData.midColIndex > colIndex) {
    for (let idx = colIndex; idx <= cacheTableData.midColIndex; idx++) {
      colList[idx].selected = true
    }
  }
  // 选中中间的单元格
  else if (cacheTableData.midColIndex === colIndex) {
    colList[colIndex].selected = true
  }
  // 选中右边的单元格
  else {
    for (let idx = cacheTableData.midColIndex; idx <= colIndex; idx++) {
      colList[idx].selected = true
    }
  }
}

function doMerge(cacheTableData: any, meta: any, menuList: any[], self: any) {
  // TODO - 合并单元格数据处理
}
