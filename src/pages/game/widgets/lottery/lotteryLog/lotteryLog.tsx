import { useWeb3React } from '@web3-react/core'
import { Spin } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { myOpenBoxHistoryApi } from 'src/pages/api/equip'
import { subTokenId } from 'src/utils'
import { pocketList } from '..'
import { I_Equip } from '../../backpack'
import { LotteryLogStyle } from './style'

const LotteryLog=()=>{
  const [loading, setLoading]=useState(false)
  const [logList, setLogList]=useState<(I_Equip&{date:number})[]>([])
  const { t, i18n: {language}} = useTranslation()
  const { account, library } = useWeb3React()
  useEffect(() => {
    setLoading(false)

  }, [account, library])
  useEffect(() => {
    getMykey()
  }, [account, library])
  const getMykey=async()=>{
    if (account){
      setLoading(true)
      const myAddress =await library.getSigner().getAddress()
      const res=await myOpenBoxHistoryApi(myAddress)
      setLogList(res.sort((a, b)=>b.date- a.date))
      // setMyEquipList(res)
      setLoading(false)
    }

  }
  return <LotteryLogStyle>
    <Spin spinning={loading}>
      <div className="main">
        {logList.map((log, index)=>{
          const packInfo=pocketList[log.key-1]
          if (!packInfo) return <></>
          return <div key={index} className='logItem'>
            <img
              className={'package'}
              src={packInfo.src}
              alt=""
              draggable="false"
            />
            <div className="box line">
              <div className='packageName'>{t(`game.lottery.${packInfo.title}`)}</div>
              <div className='tokenId'> {subTokenId(log.tokenId, 5)}</div>
            </div>
            <div className="box line rewardBox">
              <div className='reward'>{t('game.adventure.reward')}</div>
              <div className="equip">{language==='en-US'?log.en:log.name}*1</div>
            </div>
            <div className="box openBox">
              <div className='reward'>{t('game.lottery.OpeningTime')}</div>
              <div className="time">{moment.unix(log.date).format('YYYY年MM月DD HH:mm:ss')}</div>
            </div>
          </div>

        })}
      </div>

    </Spin>

  </LotteryLogStyle>

}
export default LotteryLog
