import { lazy, useEffect, useRef } from 'react'
import copy from 'copy-to-clipboard'
import { notification } from 'antd'

/**
 * 加载 pages 下面的组件
 * @param modulePath 以 src/pages/
 * @returns
 */
export const lazyLoad = (modulePath: string) => {
  const path = modulePath.replace('src/pages/', '')
  return lazy(() => import(/* webpackChunkName: "[request]" */`src/pages/${path}`))
}

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K)
  )
  return Object.fromEntries(filteredEntries) as Pick<O, K>
}

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {}
  }
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

/**
 * 获取组件的挂在状态
 * @returns
 */
export default function useMountedRef() {
  const mountedRef = useRef<boolean>(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}

/**
 * @description 简化 tokenId 显示
 * @param tokeId tokenId
 * @returns string
 */
export const subTokenId = (tokeId: string, point = 4) => `${tokeId.substring(0, point)}****${tokeId.substring(tokeId.length - point)}`


/**
 * @description 复制文字到粘贴板
 * @param text 文字
 * @param e svg图阻止冒泡
 */
export const copyToClipboard = (text: string, e?: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  e?.stopPropagation()
  copy(text)
  notification.success({
    message: 'copy success',
    duration: 0.8
  })
}
