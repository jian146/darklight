import React, { useEffect, useMemo, useState } from 'react'
import useDebounce from 'src/hooks/useDebounce'

/**
 * @description 设备类型
 */
export const enum EquType {
  PHONE = 'phone',
  PC = 'pc'
}

type WindowSizeType = `${EquType}`

const WindowSizeContext = React.createContext<{ windowSize: WindowSizeType } | undefined>(undefined)

WindowSizeContext.displayName = 'WindowSize'

export const WindowSizeProvider: React.FC = ({ children }) => {

  const [docWith, setDocWidth] = useState<number>(
    () => window.document.documentElement.clientWidth
  )
  const debWidth = useDebounce(docWith, 500)
  const windowSize = useMemo<WindowSizeType>(
    () => debWidth <= 768 ? EquType.PHONE : EquType.PC, [debWidth]
  )

  const handleResize = () => {
    const size = window.document.documentElement.clientWidth
    setDocWidth(size)
  }


  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <WindowSizeContext.Provider value={{ windowSize }}>
      {children}
    </WindowSizeContext.Provider>
  )
}

export const useWindowSize = () => {
  const context = React.useContext(WindowSizeContext)
  if (!context) {
    throw new Error('useWindowSize必须在WindowSizeProvider中使用')
  }
  return context
}

