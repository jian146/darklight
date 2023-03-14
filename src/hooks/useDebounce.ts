import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    // value/delay 发生变化以后设置定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    // 上个 useEffect 运行后执行回调函数
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

export default useDebounce
