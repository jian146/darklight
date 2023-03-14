import { useEffect, useRef } from 'react'

export default function useDocumentTitle(title: string, keepOnUnmount = true) {

  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
    return () => {
      if (!keepOnUnmount) document.title = oldTitle
    }
  }, [keepOnUnmount, oldTitle, title])
}
