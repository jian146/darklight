import { useWeb3React } from '@web3-react/core'
import { Select } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from 'src/assets/images/header/logo.svg'
import Button from 'src/components/Button'
import { injected } from 'src/provider'
import { routes } from 'src/router'
import styled from '@emotion/styled'
import { MenuDrawer, MobileHeaderWrapper } from './style'
import menuIcon from 'src/assets/images/header/m_menu.png'
import menuCloseIcon from 'src/assets/images/header/m_menu_close.png'
import { GitbookAddress } from 'src/config'


const { Option } = Select

const SelectWrapper = styled.div`
  .ant-select {
    background: transparent;
    width: 160px !important;
    color: #fff;
    font-family: bod, lanting, sans-serif;
    font-size: 20px;
    .ant-select-arrow {
      color: #fff;
      right: 30px;
      top: 50%;
      transition: all .3s ease;
    }
    &.ant-select-open {
      .ant-select-arrow {
        transform: rotate(180deg);
      }
    }
  }
`

const MobileHeader: React.FC = () => {

  const { i18n, t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const { account, activate } = useWeb3React()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const handleWalletConnect = () => {
    activate(injected)
  }

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <MobileHeaderWrapper>
      <Logo style={{ width: '96px' }} onClick={() => navigate('/')} />
      <div className="right">
        <Button
          color="#fff"
          onClick={handleWalletConnect}
          padding="2px 10px"
          borderRadius="8px"
          fontSize="16px"
          background="linear-gradient(90.7deg,#f6465d .15%,#f15f40 101.76%)"
        >
          {
            accountEllipsis || t('navigate.ConnectWallet')
          }
        </Button>
        <span className="m-menu-title" onClick={showDrawer}>
          <span>
            {t('navigate.menu')}
          </span>
          <img src={menuIcon} alt="" />
        </span>
      </div>
      <MenuDrawer
        title=""
        placement="right"
        width="50%"
        onClose={onClose}
        forceRender
        closeIcon={<img src={menuCloseIcon} alt="" />}
        visible={visible}>
        <div className="content">
          <div className="menu">
            {
              routes.filter(item => item.path !== '*').map((item, index) => (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#E2C277' : ''
                    }
                  }}
                  onClick={(e) => {
                    if (item.name === 'BuyNow') {
                      e.preventDefault()
                    }
                    if (item.name === 'GameWiki') {
                      e.preventDefault()
                      window.open(
                        GitbookAddress[i18n.language === 'zh-CN' ? 'zh-CN' : 'en-US']
                      )
                    }
                    if (item.name === 'BuyNow') {
                      e.preventDefault()
                      window.open('https://swap.darklight.finance/')
                    }
                    setVisible(false)
                  }}
                  key={index}
                  to={item.path || '/'}
                >{t(`navigate.${item.name}`)}</NavLink>
              ))
            }
          </div>
          <SelectWrapper>
            <Select
              bordered={false}
              className="ant-select"
              dropdownClassName="a-dropdown"
              defaultValue={i18n.language}
              value={i18n.language}
              style={{ width: 120 }}
              onChange={(e) => {
                localStorage.setItem('i18nextLng', e)
                i18n.changeLanguage(e)
              }}>
              <Option value="zh-CN">简体中文</Option>
              <Option value="en-US">English</Option>
            </Select>
          </SelectWrapper>
        </div>
      </MenuDrawer>
    </MobileHeaderWrapper>
  )
}

export default MobileHeader
