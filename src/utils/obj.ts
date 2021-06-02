const UUID_CACHE = [-1, 0]
/**
 * 使用日期生成伪随机UUID
 * @returns 伪随机字符串
 */
export function uuid(): string {
  const timestamp: number = Date.now()
  const num: number = UUID_CACHE[0] === timestamp ? (UUID_CACHE[1] += 1) : (UUID_CACHE[1] = 0)
  UUID_CACHE[0] = timestamp
  let str: string = timestamp + "" + num
  let index = 0
  let ret = ""
  while (index < str.length) {
    ret += parseInt(str.substr(index, 4)).toString(32)
    index += 4
  }
  return ret
}

export function assert(condition: any, msg: string = "the type assert error!"): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

export function is(condition: any, type: string): boolean {
  return !!condition ? typeof condition === type : false
}

const T: Function = Object.prototype.toString

namespace Obj {
  export const IsObj = (o: any): boolean => typeof o === "object"
  export const IsArray = (o: any): boolean => T.call(o) === "[object Array]"
  export const IsNumber = (o: any): boolean => T.call(o) === "[object Number]"
  export const IsDate = (o: any): boolean => T.call(o) === "[object Date]"
  export const IsReg = (o: any): boolean => T.call(o) === "[object RegExp]"

  const type: Function = (o: any): string =>
    !!o?.constructor?.name
      ? o.constructor.name
      : IsArray(o)
      ? "Array"
      : IsNumber(o)
      ? "Number"
      : IsReg(o)
      ? "RegExp"
      : IsObj(o)
      ? "object"
      : "undefined"

  export const convert: Function = (key: any, data: any, target: any): Parameter => {
    const kt: string = type(key)
    const dt: string = type(data)
    return { kt, key, dt, data, target }
  }

  export class Coper {
    // 处理器链
    private readonly chain: Handler[] = []
    private cover_array: boolean

    /**
     * 构造器
     * @param condition 是否覆盖相同的数组元素
     */
    constructor(condition: boolean = false) {
      this.cover_array = condition
    }

    public addHandler(h: Handler): void {
      if (h !== undefined) this.chain.push(h)
    }

    public addHanders(...hs: Handler[]): void {
      if (hs !== undefined) this.chain.push(...hs)
    }

    /**
     * 拷贝属性和行为
     * @param src 源数据
     * @param target 目标数据
     */
    public copy(target: any, src: any): any | undefined {
      // 无意义的值不需要处理
      if (target === null || target === undefined || src === null || src === undefined) {
        return target
      }

      // 两者都不是对象不做处理
      if (!IsObj(target) || !IsObj(src)) {
        return target
      }

      // 两者都是数组则合并
      if (IsArray(target) && IsArray(src)) {
        for (const key in src) {
          const value = src[key]
          const param = convert([], value, src)
          const handlers: Handler[] = this.chain.filter((item) => item.support(param)).sort()
          const size: number = handlers.length
          let index = 0
          const fn: Fn = (param: Parameter, data: any) => {
            if (index + 1 > size) {
              return data
            } else {
              index++
              return handlers[index]?.worked(param, value, fn) || value
            }
          }
          let data = handlers[index]?.worked(param, value, fn)
          if (data === null) {
            continue
          }
          data = data || value
          const list: any[] = target
          const idex = list.indexOf(data)
          if (this.cover_array && idex > -1) {
            this.copy(list[idex], data)
          } else {
            if (!IsObj(data)) {
              list.push(data)
            } else {
              const _ = {}
              this.copy(_, data)
              list.push(_)
            }
          }
        }
      }
      // 对象拷贝
      else {
        for (const key in src) {
          const value = src[key]
          // 不存在属性需要添加属性
          if (!Reflect.has(target, key)) {
            Reflect.set(target, key, IsArray(value) ? [] : IsObj(value) ? {} : null)
          }
          const param = convert(key, value, src)
          const handlers: Handler[] = this.chain.filter((item) => item.support(param)).sort()
          const size: number = handlers.length
          let index = 0
          const fn: Fn = (param: Parameter, data: any) => {
            if (index + 1 > size) {
              return data
            } else {
              index++
              return handlers[index]?.worked(param, value, fn) || value
            }
          }
          let data = handlers[index]?.worked(param, value, fn)
          if (data === null) {
            Reflect.set(target, key, data)
            continue
          }
          data = data || value
          if (!IsObj(data)) {
            Reflect.set(target, key, data)
          } else {
            this.copy(target[key], data)
          }
        }
      }
      return target
    }
  }

  /**
   * 参数属性
   * @param kt 键类型
   * @param key 键
   * @param dt 数据类型
   * @param data 数据
   */
  export declare type Parameter = { kt: string; key: any; dt: string; data: any; target: any }
  export declare type Fn = (param: Parameter, data: any) => any

  /**
   * 属性处理器
   */
  export interface Handler {
    readonly order: number

    /**
     * 是否需要处理
     * @param param 键
     */
    support(param: Parameter): boolean

    /**
     * 执行处理器
     * @param param 参数属性
     * @param chain 处理器链包装函数
     * @returns 返回null则丢弃该元素
     */
    worked(param: Parameter, data: any, chain: Fn): any
  }
}

export default Obj
