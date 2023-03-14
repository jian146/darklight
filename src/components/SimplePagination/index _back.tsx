import nextImg from 'src/assets/images/common/next.png'
import prevImg from 'src/assets/images/common/prev.png'
import classnames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type PaginationProps = {
  current: number
  total: number
  hideOnSinglePage?: boolean
  pageSize?: number
  currentPageCount:number
  currentChange?: (page: number) => void
}

const SimplePagination: React.FC<PaginationProps> = ({
  current,
  total,
  currentChange,
  pageSize=12,
  currentPageCount,
  hideOnSinglePage = true
}) => {

  const { i18n: { language } } = useTranslation()
  const page = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  const handleClick = (p: 'add' | 'sub') => {
    if (p === 'sub') {
      currentChange?.(current <= 1 ? 1 : current - 1)
    } else if (p === 'add') {
      currentChange?.(currentPageCount!==9 ? current : current + 1)
    }

  }

  if (hideOnSinglePage && page === 1) {
    return <></>
  }

  return (
    <span className="flex items-center text-primary select-none">
      <img
        className={classnames('cursor-pointer', {
          'filter saturate-0 brightness-0 contrast-50 cursor-not-allowed': current <=1
        })}
        src={prevImg}
        alt=""
        onClick={() => handleClick('sub')}
      />
      <span className="text-base ml-3 mr-1">
        { language === 'zh-CN' ? `第${current}页` : `Page ${current}` }
      </span>
      {/* <span className="text-base mr-3">
        { language === 'zh-CN' ? `共${page}页` : `of ${page}`}
      </span> */}
      <img
        className={classnames('cursor-pointer', {
          'filter saturate-0 brightness-0 contrast-50 cursor-not-allowed': currentPageCount!==9
        })}
        src={nextImg}
        alt=""
        onClick={() => handleClick('add')}
      />
    </span>
  )
}

export default SimplePagination
