/* eslint-disable jsx-a11y/anchor-is-valid */
import { FooterWrapper } from './style'
import { ReactComponent as Logo } from 'src/assets/images/header/logo.svg'
import { ReactComponent as Twitter } from 'src/assets/images/footer/twitter.svg'
import { ReactComponent as Telegram } from 'src/assets/images/footer/telegram.svg'
import { DLT_ADDRESS, GOLD_ADDRESS } from 'src/web3'
import React, { CSSProperties } from 'react'
import { EquType, useWindowSize } from 'src/context'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import { copyToClipboard } from 'src/utils'
import { isDisabledConfig } from 'src/config/switch'

const Footer: React.FC<{ style?: CSSProperties }> = ({ style }) => {

  const { windowSize } = useWindowSize()
  const { t, i18n: {language} } = useTranslation()

  const openReport = () => {
    window.open('https://github.com/solidproof/projects/tree/main/Dark%20Light')
  }

  const openSwap = () => {
    window.open('https://swap.darklight.finance/')
  }

  return (
    <FooterWrapper style={style}>
      {
        windowSize === EquType.PC ? <div className="footer-top pc">
          <div className="wrapper">
            <div className="top">
              <Logo width="132" height="50" />
              <div className="item">
                <div className="item-btn" onClick={openSwap}>
                  {t('footer.buy')} $DLT
                </div>
                { !isDisabledConfig&& <div className="item-btn" onClick={openSwap}>
                  {t('footer.buy')} $Gold
                </div>}
              </div>
            </div>
            <div className="footer-b">
              <div>$DLT{t('footer.address')}:
                <i className="Num-font">
                  {DLT_ADDRESS}
                  <CopyIcon
                    width="16"
                    height="16"
                    fill="#664F42"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={(e) => copyToClipboard(DLT_ADDRESS, e)}
                  />
                </i>
              </div>
              {!isDisabledConfig&&<div>$GOLD{t('footer.address')}:
                <i className="Num-font">
                  {GOLD_ADDRESS}
                  <CopyIcon
                    width="16"
                    height="16"
                    fill="#664F42"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={(e) => copyToClipboard(GOLD_ADDRESS, e)}
                  />
                </i>
              </div> }
            </div>
          </div>
          <div className="container">
            <div className="footer-right">
              <div className="item">
                <div className="item-title">
                  {t('footer.social')}
                </div>
                <a
                  href="https://twitter.com/BSC_Darklight"
                  className="item-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter />
                  <span>Twitter</span>
                </a>
                <a
                  href={
                    language === 'zh-CN' ?
                      'https://t.me/Darklight_BSC_CN' :
                      'https://t.me/Darklight_BSC_EN'
                  }
                  target="_blank"
                  className="item-link"
                  rel="noreferrer">
                  <Telegram />
                  <span>Telegram</span>
                </a>
              </div>
              <div className="item">
                <div className="item-title">
                  {t('footer.info')}
                </div>
                <div className="item-link" onClick={openReport}>
                  {t('footer.auditReport')}
                </div>
                <div className="item-link" onClick={openReport}>
                  KYC
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="footer-mobile">
          <div className="top">
            <Logo width="132" height="50" />
            <div className="item">
              <div className="item-btn" onClick={openSwap}>
                {t('footer.buy')} $DLT
              </div>
              {
                !isDisabledConfig&&<div className="item-btn" onClick={openSwap}>
                  {t('footer.buy')} $Gold
                </div>
              }

            </div>
          </div>
          <div className="container">
            <div className="item">
              <div className="item-title">
                {t('footer.buy')}
              </div>
              <a
                href="https://twitter.com/BSC_Darklight"
                className="item-link"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter />
                <span>Twitter</span>
              </a>
              <a
                href={
                  language === 'zh-CN' ?
                    'https://t.me/Darklight_BSC_CN' :
                    'https://t.me/Darklight_BSC_EN'
                }
                target="_blank"
                className="item-link"
                rel="noreferrer">
                <Telegram />
                <span>Telegram</span>
              </a>
            </div>
            <div className="item">
              <div className="item-title">
                {t('footer.info')}
              </div>
              <div className="item-link" onClick={openReport}>
                {t('footer.auditReport')}
              </div>
              <div className="item-link" onClick={openReport}>
                KYC
              </div>
            </div>
          </div>
          <div className="footer-b">
            <span>$DLT{t('footer.address')}:
              <i className="Num-font">
                {DLT_ADDRESS}
                <CopyIcon
                  width="16"
                  height="16"
                  fill="#664F42"
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={(e) => copyToClipboard(DLT_ADDRESS, e)}
                />
              </i>
            </span>
            {
              !isDisabledConfig&&<span>$GOLD{t('footer.address')}:
                <i className="Num-font">
                  {GOLD_ADDRESS}
                  <CopyIcon
                    width="16"
                    height="16"
                    fill="#664F42"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={(e) => copyToClipboard(GOLD_ADDRESS, e)}
                  />
                </i>
              </span>
            }

          </div>
        </div>
      }
      <div className="copy-right">
        Copyright DARKLIGHT. All Rights ReservedDesigned by DLT Inc.
      </div>
    </FooterWrapper>
  )
}

export default Footer
