import React, {useEffect, useState} from 'react'
import { LiquidityWrapper } from './style'
import usdtImg from 'src/assets/images/liquidity/USDT.png'
import dltImg from 'src/assets/images/liquidity/DLT.png'
import arrowImg from 'src/assets/images/liquidity/arrow.png'
import Button from 'src/components/Button'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import { useNavigate } from 'react-router-dom'
import titleRight from 'src/assets/images/dialog/transfer_dialog/titleRight.png'
import titleLeft from 'src/assets/images/dialog/transfer_dialog/titleLeft.png'

import { getgetApyInfoApi, I_getApyInfo } from 'src/pages/api/request'
import { notification, Spin } from 'antd'
import { isCloseLiuidity, isServerConfig } from 'src/config/switch'

const Liquidity: React.FC = () => {
  let timer: NodeJS.Timeout

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading]=useState(false)
  const [data, setData]=useState<I_getApyInfo>(
    {
      APY: '0',
      dayAmount: '0',
      monthAmount: '0',
      stakeAmount: '0'
    }
  )
  useEffect(()=>{

    if (isServerConfig){
      setLoading(true)
      notification['info']({
        message: t('message.serverMaintenance'),
        duration: null,
        description: ''
      })
      return
    }
    initData()
    startSetTime()
  }, [])
  useEffect(() =>{
    return ()=>{
      if (timer){
        clearTimeout(timer)
      }
    }
  })
  const startSetTime=()=>{
    if (!isServerConfig){
      timer= setInterval(() => {
        initData()
      }, 1000*60*5)
    }

  }
  const initData=()=>{
    setLoading(true)

    getgetApyInfoApi().then((res)=>{
      if (res){
        setData(res)
        setLoading(false)
      }
      setLoading(false)
    }).catch((err)=>{
      console.error('获取统计数据失败', err)
      setLoading(false)
    })
  }
  return (

    <LiquidityWrapper>

      <div className="title">
        <img className="" src={titleLeft} alt="" />
        <span className="pr-8 pl-8  titleText">
          {t('navigate.LiquidityMining')}
        </span>
        <img className="" src={titleRight} alt="" />

      </div>
      <Spin spinning={loading}>
        <div className="cnt">
          <div className="cnt-tit">
            <div className="img">
              <img src={dltImg} alt="" />
              <img className="usdt" src={usdtImg} alt="" />
            </div>
            <div className="cnt-text">DLT / USDT</div>
          </div>
          <div className="data-re">
            <div className="item">
              <span>
                {t('liquidity.daily')}
              </span>
              <span>{data.dayAmount}DLC</span>
            </div>
            <div className="item">
              <span>
                {t('liquidity.monthly')}
              </span>
              <span>{data.monthAmount}DLC</span>
            </div>
            <div className="item">
              <span>
                {t('liquidity.stake')}
              </span>
              <span>{parseFloat(data.stakeAmount).toFixed(4)}U</span>
            </div>
            <img className="arrow" src={arrowImg} alt="" />
            <div className="item">
              <span>
                {t('liquidity.apy')}
              </span>
              <span>{data.APY}%</span>
            </div>
            <Button
              color="#B2856C"
              width="186px"
              height="46px"
              img={btnRedBg}
              bold
              disabled={isCloseLiuidity}
              className="mt-5"
              onClick={()=>{
                navigate('/liquidity/liquidityDetail')
              }}
            >
              {t('liquidity.stake')}
            </Button>
          </div>
        </div>
      </Spin>
    </LiquidityWrapper>

  )
}

export default Liquidity
