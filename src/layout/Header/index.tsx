import React from 'react'
import { PCHeaderWrapper } from './style'
import { NavLink, useNavigate } from 'react-router-dom'
import { notification, Select } from 'antd'
import styled from '@emotion/styled'
import { ReactComponent as Logo } from 'src/assets/images/header/logo.svg'
import { routes } from 'src/router'
import { useWeb3React } from '@web3-react/core'
import { injected } from 'src/provider'
import { useTranslation } from 'react-i18next'
import { GitbookAddress } from 'src/config'
import Button from 'src/components/Button'
const { Option } = Select

const SelectWrapper = styled.div`
  margin-left: 26px;
  .ant-select {
    background: transparent;
    width: 160px !important;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: bod, lanting, sans-serif;
    .ant-select-arrow {
      color: #fff;
      right: 50px;
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

const PCHeader: React.FC = () => {

  const { i18n, t } = useTranslation()
  const { account, activate } = useWeb3React()
  const navigate = useNavigate()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const handleWalletConnect = () => {
    if (account) return
    activate(injected, (error) => {
      notification.error({
        message: 'Error',
        description:
          error.message
      })
    })
  }

  return (
    <PCHeaderWrapper>
      <div className="header-box">
        <div className="pc-header">
          <div className="left">
            <Logo
              style={{ flexShrink: 0, width: '132px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
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
                    }}
                    key={index}
                    to={item.path || '/'}
                  >{t(`navigate.${item.name}`)}</NavLink>
                ))
              }
            </div>
          </div>
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
        </div>
      </div>
    </PCHeaderWrapper>
  )
}

export default PCHeader
