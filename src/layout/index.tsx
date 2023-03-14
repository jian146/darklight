import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'
import { injected } from 'src/provider'
import { EquType, useWindowSize } from 'src/context'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'src/hooks/useDocTitle'
import { useLocation } from 'react-router'
import PCHeader from './Header'
import MobileHeader from './Header/mobile_header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {

  const { activate } = useWeb3React()
  const { windowSize } = useWindowSize()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  useDocumentTitle(t('webTitle'))
  useEffect(() => {
    // 用户登录网站先自动尝试登录钱包
    activate(injected)
  }, [activate])

  return (
    <>
      <div style={{ paddingTop: windowSize === EquType.PC ? '96px' : '56px' }}>
        {
          windowSize === EquType.PC ? <PCHeader /> : <MobileHeader />
        }
        {children}
        {pathname !== '/' && <Footer />}
      </div>
    </>
  )
}

export default Layout
