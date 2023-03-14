
import { useWeb3React } from '@web3-react/core'
import { message, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import Back from 'src/components/Back'
import { getHarvestInfoApi, getStakeInfoApi, getUnstakeInfoApi, I_getStakeInfo } from 'src/pages/api/request'
import BoxItem from './components/box'
import { LiquidityDetailWrapper } from './style'

import { approveDltFarm, queryLp } from 'src/web3'
import { useState, useEffect } from 'react'

import { harvestAbi, stakeAbi, unstakeAbi } from 'src/web3/dltFarm'
import InputDialog from 'src/components/Dialog/InputDialog'
import { BigNumber, ethers } from 'ethers'
import { getMyLP } from 'src/web3/lp'

export interface I_boxItem{
  title:string,
  count: number|string,
  btnText:string,
  disabled?:boolean,
  onClick: () =>void
}
const LiquidityDetail=() =>{
  const { t } = useTranslation()
  let timer: NodeJS.Timeout
  let timerGetInfo: NodeJS.Timeout
  const { library, account } = useWeb3React()
  const [isShowInputModel, setIsShowInputModel] =useState(false)
  const [isApprove, setIsApprove] =useState(false)
  const [loading, setLoading]=useState(false)
  const [myLp, setMyLp] = useState('0')
  const [endTime, setEndTime]=useState(0)
  const [stakeInfo, setStakeInfo] = useState<I_getStakeInfo>({
    stakeAmount: '0',
    harvestAmount: '0',
    coldTime: 0
  })
  useEffect(() => {
    if (account) {
      startSetTime()
      reload()
      queryLp(library, account)
        .then((res) => {
          if (res.lte(ethers.utils.parseEther('1'))) {
            setIsApprove(false)
          } else setIsApprove(true)
        })
        .catch((e) => {
          setIsApprove(false)
        })
    }
  }, [account, library])
  useEffect(() =>{
    return ()=>{
      if (timer){
        clearTimeout(timer)
      }
      if (timerGetInfo){
        clearTimeout(timerGetInfo)
      }
    }
  })

  const reload = async () => {
    setLoading(true)
    await getStakeInfo(true)
    await getMyLpAbi()

  }
  const getMyLpAbi=async () =>{
    const myAddress =await library.getSigner().getAddress()
    getMyLP(library, myAddress).then((res)=>{
      if (res){
        setMyLp(res)
      } else {
        setMyLp('0')
      }

    })

  }
  /**
   * 获取可领取的信息
   */
  const getStakeInfo=async (isLoading=false)=>{
    if (isLoading){
      setLoading(true)
    }
    const myAddress =await library.getSigner().getAddress()
    getStakeInfoApi(myAddress).then((res)=>{
      if (res){

        setStakeInfo(res)

        if (timer){
          clearTimeout(timer)
        }
        if (res.coldTime){
          countDown(res.coldTime)
        }
      }
      if (isLoading){
        setLoading(false)
      }
    }).catch((err)=>{
      console.error('获取统计数据失败', err)
      if (isLoading){
        setLoading(false)
      }
    })
  }

  /**
   * 授权
   */
  const authorizeLp = async () => {
    if (account) {
      approveDltFarm(library)
        .then((res) => {
          setIsApprove(true)
          openStakeModel(true)
        })
        .catch(() => setIsApprove(false))
    }
  }

  /**
 * 开始质押,打开质押弹窗和授权
 */
  const openStakeModel=async (isReady=false)=>{
    //已经授权了避免重复授权
    if (isReady===true){
      setIsShowInputModel(true)
      return
    }

    if (!isApprove){
      authorizeLp()
      return
    }
    setIsShowInputModel(true)

  }
  /**
 * 质押
 */
  const stake=async (value:string)=>{
    const numberValue=parseFloat(value)
    if (numberValue<=0||isNaN(numberValue)){
      message.info('Input error')
      return

    } else if (numberValue>parseFloat(myLp)){
      message.info(t('liquidity.details.insufficientLPBalance'))
      return
    }
    if (library){
      setLoading(true)
      try {

        const res=await stakeAbi(library, numberValue)
        if (!res){
          message.error('server error')
          return
        }
        setIsShowInputModel(false)
        setLoading(false)

        reload()
      } catch (error) {
        message.error('contract error')
        setLoading(false)
      }

    }
  }
  /**
 * 收菜
 */
  const getHarvestInfo=async ()=>{

    if (library){
      try {
        setLoading(true)
        const myAddress =await library.getSigner().getAddress()
        const res=await getHarvestInfoApi(myAddress)

        if (!res||!res.isSuccee){
          message.error('server error')
          return
        }
        const abiResult = await harvestAbi(library, BigNumber.from(res.harvestBlock), BigNumber.from(res.harvestAmount.hex), res.signature, res.player, res.lastBlock)
        if (abiResult){
          reload()
          setLoading(false)
        }

      } catch (error) {
        console.error('error', error)
        message.error('server error')
        setLoading(false)
      }

    }

  }
  /**
   * 解除收菜
   */
  const getUnstakeInfo=async ()=>{
    setLoading(true)
    if (library){
      try {
        const myAddress =await library.getSigner().getAddress()
        const res=await getUnstakeInfoApi(myAddress)
        if (!res||!res.isSuccee){
          message.error('server error')
          return
        }
        const abiResult = await unstakeAbi(library, res.lastBlock, BigNumber.from(res.harvestBlock+''), BigNumber.from(res.harvestAmount.hex), res.stakeIndexs, res.signature)
        if (abiResult){
          setLoading(false)
          reload()

        }
      } catch (error) {
        message.error('server error')
        setLoading(false)
      }

    }

  }
  const startSetTime=()=>{

    timerGetInfo= setInterval(() => {
      getStakeInfo()
    }, 1000*60*5)
  }
  const isDisabled=endTime>0

  const format=(num:number) =>{
    return '0'.repeat(2 - String(Math.floor(num / 3600)).length) + Math.floor(num / 3600) + ':' + '0'.repeat(2 - String(Math.floor((num%3600) / 60)).length) + Math.floor((num%3600) / 60) + ':' + '0'.repeat(2 - String(Math.floor((num%3600) % 60)).length) + Math.floor((num%3600) % 60)
  }
  //时间显示
  const getEndtTime=format(endTime)
  const boxList:I_boxItem[]=[
    {
      title: `${t('liquidity.details.notReceivingRewards')}(DLC)`,
      count: parseFloat(stakeInfo.harvestAmount).toFixed(4),
      btnText: isDisabled?getEndtTime: t('liquidity.details.collectRewards'),
      disabled: isDisabled,
      onClick: getHarvestInfo
    },
    {
      title: `${t('liquidity.stake')}(DLT/USDT)`,
      count: stakeInfo.stakeAmount,
      btnText: t('liquidity.stake'),
      onClick: ()=>{ openStakeModel(false) }
    },
    // {
    //   title: `${t('liquidity.details.notReceivingRewards')}(DLC)`,
    //   count: 0,
    //   btnText: t('liquidity.details.collectRewards'),
    // },
    {
      title: `${t('liquidity.details.releaseRromCustody')}(DLT/USDT)`,
      count: stakeInfo.stakeAmount,
      btnText: t('liquidity.details.releaseRromCustody'),
      onClick: getUnstakeInfo
    }
  ]


  const countDown=(time:number)=>{
    if (time>0){
      timer= setTimeout(() => {
        setEndTime(time-1)
        countDown(time-1)
      }, 1000)
    } else {
      clearTimeout(timer)
      setEndTime(0)
    }

  }
  const renderLpInfo=<div className="lpInfo">
    {t('liquidity.details.available')}LP:{myLp}
  </div>


  return <LiquidityDetailWrapper>
    <Back className='backDom' />
    <Spin spinning={loading}>
      <div className="main">
        {boxList.map((item, index)=>{
          return <div key={index} className="boxBg">
            <BoxItem data={item} />
          </div>

        })}
      </div>
      <div id='InputDialog'>
        <InputDialog
          visible={isShowInputModel}
          onOkCallBack={stake}
          title={renderLpInfo}
          max={parseInt(myLp)}
          onCancel={()=>{ setIsShowInputModel(false) }}
          placeholder={t('liquidity.details.pleaseEnterThePledgeQuantity')}
          id='InputDialog'
        />
      </div>

    </Spin>


  </LiquidityDetailWrapper>

}
export default LiquidityDetail
