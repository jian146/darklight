import { PresaleWrapper } from './style'
import logo from 'src/assets/images/presale/logo.png'
import imgdivider from 'src/assets/images/presale/imgdivider.png'
import top from 'src/assets/images/index/top.png'
import { notification, Progress, Spin } from 'antd'
import Button from 'src/components/Button'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import * as preSale from 'src/web3/presale'
import { useTranslation } from 'react-i18next'
import topImg from 'src/assets/images/presale/top.png'
import bottomImg from 'src/assets/images/presale/bottom.png'
import { ethers } from 'ethers'
import { SaleState, SaleStateType } from 'src/types/presale'
import useCountDown from 'ahooks/lib/useCountDown'
import btnRedBg from 'src/assets/images/common/btn_red.png'

const PreSale: React.FC = () => {

  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  // 页面的加载状态
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  // 公募状态
  const [saleState, setSaleState] = useState<SaleStateType>('Upcoming')
  // 预购买公募的数量
  const [purchaseNum, setPurchaseNum] = useState<string>('')
  // 参与公募的人数
  const [personNum, setPersonNum] = useState<number>(0)
  // 已经售卖的BNB数量
  const [saledBNB, setSaledBNB] = useState<number>(0)
  const [boughtBNBNum, setBoughtBNBNum] = useState<number>(0)
  // 是否已经提币
  const [isClaim, setIsClaim] = useState<boolean>(true)
  // 倒计时的
  const [, formattedRes] = useCountDown({
    targetDate: '2022-03-14 22:00:00'
  })

  const { days, hours, minutes, seconds } = formattedRes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setLoading(true)
    if (account) {
      // 获取公募的状态
      preSale.getPresaleStatus(library).then(res => {
        const type = SaleState[res] as SaleStateType
        setSaleState(type)
        setLoading(false)
      }).catch(e => notification.error({
        message: 'error',
        description: e?.data?.message || 'error'
      }))
    }
  }, [account, library])

  useEffect(() => {
    // 获取参与公募的人数
    if (account && saleState !== 'Upcoming') {
      preSale.getPresalePeoNum(library).then(res => {
        setPersonNum(res.toNumber())
      }).catch(e => notification.error({
        message: 'error',
        description: e?.data?.message || 'error'
      }))
    }
  }, [account, library, saleState])

  /**
   * 获取以售BNB数量
   */
  const getSaledBNB = useCallback(() => {
    preSale.saledBNB(library).then(res => {
      const num = res.mul(10000).div(ethers.utils.parseEther('1000')).toNumber() / 10
      setSaledBNB(num)
    }).catch(e => {
      notification.error({
        message: 'error',
        description: e?.data?.message || 'error'
      })
    })
  }, [library])

  useEffect(() => {
    // 获取已经公募的BNB数量
    if (account && saleState !== 'Upcoming') {
      getSaledBNB()
    }
  }, [account, getSaledBNB, saleState])

  /**
   * 获取用户购买的 BNB 数量
   */
  const getUserBoughtBNB = useCallback(() => {
    if (account && saleState !== 'Upcoming') {
      preSale.buys(library, account).then(res => {
        const num = res.mul(10000).div(ethers.utils.parseEther('1000')).toNumber() / 10
        setIsClaim(res.isZero())
        setBoughtBNBNum(num)
      }).catch(e => {
        notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
      })
    }
  }, [account, library, saleState])

  useEffect(() => {
    getUserBoughtBNB()
  }, [getUserBoughtBNB])

  /**
   * 购买BNB
   */
  const handleUserBuyBNB = () => {
    setBtnLoading(true)
    if (account) {
      preSale.buy(library, purchaseNum).then(() => {
        setBtnLoading(false)
        // 查询购买币的数量
        getUserBoughtBNB()
        setPurchaseNum('')
        notification.success({
          message: 'success',
          description: 'success'
        })
      }).catch(e => {
        setBtnLoading(false)
        notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
      })
    }
  }

  /**
   * 公募结束，用户提币
   */
  const handleUserClaimBNB = () => {
    setBtnLoading(true)
    if (account) {
      preSale.claim(library).then(() => {
        setBtnLoading(false)
        // 提完毕再次查询购买数量
        getUserBoughtBNB()
        notification.success({
          message: 'success',
          description: 'success'
        })
      }).catch(e => {
        setBtnLoading(false)
        notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
      })
    }
  }

  const onlyNumber = (value: string) => {
    //先把非数字的都替换掉，除了数字和.
    value = value.replace(/[^\d.]/g, '')
    //必须保证第一个为数字而不是.
    value = value.replace(/^\./g, '')
    //保证只有出现一个.而没有多个.
    value = value.replace(/\.{2,}/g, '.')
    //保证.只出现一次，而不能出现两次以上
    value = value
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
    value = value.replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3')
    // 此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.indexOf('.') < 0 && value !== '') {
      value = parseFloat(value).toString()
    }
    if (parseFloat(value) >= 20) {
      value = '20'
    }
    return value
  }

  return (
    account ?
      <PresaleWrapper
        stateColor={saleState === 'Sale Ended' ? 'red' : 'green'}
        className="relative">
        <img
          src={top}
          className="md:-top-3.5 w-full absolute left-1/2 -top-1.5  transform -translate-x-1/2"
          alt=""
        />
        <div className="presale relative mx-auto md:mt-28 mt-9">
          <Spin spinning={loading} size="large">
            <img
              className="w-full -mb-0.5"
              src={topImg}
              alt=""
            />
            <div className="presale-content
          flex flex-wrap justify-between">
              <div className="left">
                <div className="flex justify-start items-start">
                  <img src={logo} className="mr-5 logo" alt="" />
                  <div className="text-black flex-1">
                    <div className="w-full l-title flex items-center justify-between">
                      <p className="text-2xl">DarkLight Pubic Offering</p>
                      <span>
                        <div className="status">
                          {t(saleState)}
                        </div>
                      </span>
                    </div>
                    <div className="mt-8 text-sm">
                      DarkLight is an online game based on Binance Smart Chain (BSC).
                      <br />
                      <span>
                        Check：
                        <a
                          className="text-blue006DA5 hover:text-blue006DA5"
                          href="https://darklight.gitbook.io/darklight/">
                          https://darklight.gitbook.io/darklight/
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="list">
                  <div className="item flex flex-wrap justify-between items-start mt-12">
                    <span>Public Offering Address</span>
                    <span className="text-redA60000">
                      {process.env.REACT_APP_PRESALE_ADDR}
                    </span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Token Name</span>
                    <span>DarkLight</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Token Symbol</span>
                    <span>DLT</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Token Decimals</span>
                    <span>18</span>
                  </div>
                  <div className="item flex flex-wrap justify-between items-start">
                    <span>Token Address</span>
                    <span className="text-right">
                      <p className="text-redA60000">
                        {process.env.REACT_APP_DLT_ADDR}
                      </p>
                      <p className="text-blue006DA5">
                        (Do not send BNB to the token address!)
                      </p>
                    </span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Total Supply</span>
                    <span>200,000,000 DLT</span>
                  </div>
                  {/* <div className="item flex justify-between items-start">
                    <span>Tokens For Public Offering</span>
                    <span>30,000,000 DLT</span>
                  </div> */}
                  <div className="item flex justify-between items-start">
                    <span>Public Offering</span>
                    <span>1BNB=10,000 DLT</span>
                  </div>
                  {/* <div className="item flex justify-between items-start">
                    <span>Soft Cap - Hard Cap</span>
                    <span>0-1000BNB</span>
                  </div> */}
                  <div className="item flex justify-between items-start">
                    <span>Public Offering Start Time</span>
                    <span>13 Mar 2022 12:00 UTC</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Public Offering End Time</span>
                    <span>14 Mar 2022 14:00 UTC</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Listing On</span>
                    <span className="text-redA60000">Pancakeswap</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>DLT Liquidity Percent</span>
                    <span>50%</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>GOLD Liquidity Percent</span>
                    <span>50%</span>
                  </div>
                  <div className="item flex justify-between items-start">
                    <span>Liquidity Unlocked Time</span>
                    <span className="text-redA60000">36500 days after pool ends</span>
                  </div>
                </div>
              </div>
              <div className="right ml-3">
                {
                  saleState === 'Sale Live' && <>
                    <div className="mb-4">
                      <p className="text-center mb-3">Public Offering Ends In</p>
                      <div className="flex justify-center">
                        <span
                          className="w-9 h-9 bg-opacity-10 bg-black m-1 text-center
                      leading-9 font-extrabold text-lg"
                        >
                          {days.toString().padStart(2, '0')}
                        </span>
                        <span
                          className="w-9 h-9 bg-opacity-10 bg-black m-1 text-center
                      leading-9 font-extrabold text-lg"
                        >
                          {hours.toString().padStart(2, '0')}
                        </span>
                        <span
                          className="w-9 h-9 bg-opacity-10 bg-black m-1 text-center
                      leading-9 font-extrabold text-lg"
                        >
                          {minutes.toString().padStart(2, '0')}
                        </span>
                        <span
                          className="w-9 h-9 bg-opacity-10 bg-black m-1 text-center
                      leading-9 font-extrabold text-lg"
                        >
                          {seconds.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </>
                }
                <div className="m w-80 flex flex-col justify-start items-center m-auto">
                  <div className="text-sm w-full p-4 bg-opacity-10 bg-black mb-7">
                    Make sure the website is darklight.finance!
                  </div>
                  <Progress showInfo={false} percent={saledBNB / 20} />
                  <div className="flex w-full items-center justify-between mt-3">
                    <span className="text-xs">{saledBNB} BNB</span>
                    <span className="text-xs"></span>
                  </div>
                  <div className="text-sm p-4 bg-opacity-10 bg-black w-full mt-7">
                    ALL RAISED BNB WILL ADD INTO LIQUIDITY POOL<br />
                    LP HAS BEEN BURNED
                  </div>
                  {
                    (saleState === 'Sale Ended' || saleState === 'Claim') && <>
                      <p className="mt-5 mb-4">This pool has ended</p>
                      <Spin spinning={btnLoading}>
                        <Button
                          width="158px"
                          height="40px"
                          bold
                          img={btnRedBg}
                          disabled={saleState !== 'Claim' && isClaim}
                          onClick={handleUserClaimBNB}
                        >Claim</Button>
                      </Spin>
                    </>
                  }
                  {
                    saleState === 'Sale Live' && <>
                      <div className="w-full my-5">
                        <p>Amount</p>
                        <div
                          className="flex w-full justify-between items-center sale-input"
                        >
                          <input
                            type="text"
                            placeholder='0.2BNB-20BNB'
                            className="placeholder-black placeholder-opacity-50"
                            value={purchaseNum}
                            onChange={(e) => {
                              setPurchaseNum(onlyNumber(e.target.value))
                            }}
                          />
                          <span
                            className="text-redA60000 font-medium cursor-pointer"
                            onClick={() => setPurchaseNum('20')}
                          >MAX</span>
                        </div>
                      </div>
                      <Spin spinning={btnLoading}>
                        <Button
                          width="158px"
                          height="40px"
                          bold
                          img={btnRedBg}
                          disabled={purchaseNum === '' || parseFloat(purchaseNum) < 0.2}
                          onClick={handleUserBuyBNB}
                        >Buy</Button>
                      </Spin>
                    </>
                  }
                  <img className="mt-5" src={imgdivider} alt="" />
                  <div
                    className="w-full flex justify-between items-start i-bd mt-5"
                  >
                    <span>My Purchase</span>
                    <span>{boughtBNBNum} BNB</span>
                  </div>
                  <div className="w-full flex justify-between items-start i-bd">
                    <span>My Token</span>
                    <span>{boughtBNBNum * 10000} DLT</span>
                  </div>
                  {
                    saleState !== 'Upcoming' && <>
                      <div className="w-full flex justify-between items-start i-bd">
                        <span>Total Contributors</span>
                        <span className="text-redA60000">{personNum}</span>
                      </div>
                    </>
                  }
                </div>
                {/* <img
                  className="mt-9 w-full md:transform md:scale-110"
                  src={pieImg}
                  alt=""
                /> */}
              </div>
            </div>
            <img
              className="w-full -mb-0.5"
              src={bottomImg}
              alt=""
            />
          </Spin>
        </div>
      </PresaleWrapper>
      : <></>
  )
}

export default PreSale
