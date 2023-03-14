import { LotteryWrapper } from './style'
import iconRecord from 'src/assets/images/game/adventure/icon_record.png'
import wood from 'src/assets/images/game/lottery/wood.png'
import gold from 'src/assets/images/game/lottery/gold.png'
import silver from 'src/assets/images/game/lottery/silver.png'
import diamond from 'src/assets/images/game/lottery/diamond.png'
import Button from 'src/components/Button'
import { message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import { ResultDialog } from 'src/components/Dialog'
import { I_Equip } from '../backpack'
import EquipImg from 'src/components/EquipImg/equipImg'

import { useWeb3React } from '@web3-react/core'
import { getMyEquipsApi } from 'src/pages/api/equip'
import { getSigner } from 'src/web3/equip'
import Back from 'src/components/Back'
import LotteryLog from './lotteryLog/lotteryLog'
import { getOpenboxSignApi, openBoxApi } from 'src/pages/api/key'

interface I_pocket{
  title: string;
  src: string;
  type: 'pre' | 'started';
}
export const pocketList: Array<I_pocket> = [
  {
    title: 'Wooden',
    src: wood,
    type: 'started'
  },
  {
    title: 'Silver',
    src: silver,
    type: 'started'
  },
  {
    title: 'Gold',
    src: gold,
    type: 'started'
  },
  {
    title: 'Diamond',
    src: diamond,
    type: 'started'
    // type: 'pre'
  }
]

const Lottery: React.FC = () => {

  const { t, i18n: {language}} = useTranslation()
  const { account, library } = useWeb3React()
  const [loading, setLoading]=useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(-1)
  const [btnLoading, setBtnLoading] = useState(false)
  const [keyList, setKeyList] = useState<I_Equip[][]>([[], [], [], []])
  const [rewardList, setRewardList]=useState<I_Equip[]>([])
  const [logShow, setLogShow]=useState(false)

  useEffect(() => {
    getMykey()
  }, [account, library])


  const getMykey=async(isLoading=true)=>{
    if (account){
      if (isLoading){
        setLoading(true)
      }

      const myAddress =await library.getSigner().getAddress()
      const res=await getMyEquipsApi(myAddress, 1)
      const initKeyList:I_Equip[][]=[[], [], [], []]
      res.forEach(item => {
        if (item.key>=1&&item.key<=4){
          initKeyList[item.key-1].push(item)
        }
      })
      setKeyList([...initKeyList])
      setLoading(false)
    }

  }

  const openBox=async(item:I_pocket, index:number)=>{

    if (btnLoading) {
      return
    }
    if (keyList[index].length===0){
      return
    }

    try {
      setBtnLoading(true)
      const tokenId=keyList[index][0].tokenId
      const myAddress =await library.getSigner().getAddress()
      const signerApires=await getOpenboxSignApi(myAddress, tokenId)


      if (signerApires){
        const mySigner = await getSigner(library, signerApires)
        if (mySigner){
          const openBoxApires=await openBoxApi(myAddress, tokenId, mySigner)
          if (openBoxApires){
            await getMykey(false)
            setRewardList(openBoxApires)
            starAnimation(index)
            return
          }
        }

      }
      message.error('open Fail')
      setBtnLoading(false)
      setOpenIndex(-1)

    } catch (error) {
      message.error('open Fail')
      setBtnLoading(false)
      setOpenIndex(-1)
    }


  }

  const starAnimation=(index:number)=>{
    setOpenIndex(index)
    setTimeout(() => {
      setIsOpen(true)
      setBtnLoading(false)
      setOpenIndex(-1)

    }, 1500)
  }
  return (
    <Spin spinning={loading||btnLoading}>
      {
        logShow? <div className='w-full'>
          <div><Back className='clossBack' backCall={()=>{ setLogShow(false) }} /></div>
          <div><LotteryLog /></div>
        </div>:<LotteryWrapper>
          {/* 开宝箱 */}
          <div className="record" onClick={()=>{ setLogShow(true) }}>
            <img src={iconRecord} alt="" />
            <span>{t('game.lottery.history')}</span>
          </div>
          <div className="lottery-wrapper">
            {pocketList.map((item, index) => (
              <div className="lottery-item" key={item.src}>
                <div className="wrapper">
                  <p className="title">{t(`game.lottery.${item.title}`)}</p>
                  <div className="keyNumber">X<span className="count">{keyList[index].length}</span></div>
                  <img
                    className={`package ${
                      openIndex === index ? 'openPackage' : ''
                    } `}
                    src={item.src}
                    alt=""
                    draggable="false"
                  />
                  <Button
                    className="lottery-button"
                    width="192px"
                    height="48px"
                    // loading={openIndex === index ?btnLoading:false}
                    bold
                    fontSize="16px"
                    disabled={item.type === 'pre'||(keyList[index].length===0)}
                    img={item.type === 'started' ? btnRedBg : btnDarkBg}
                    onClick={() => {
                      openBox(item, index)

                    }}
                  >
                    {t('game.lottery.open')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div id="ResultDialogBox">
            <ResultDialog
              visible={isOpen}
              onCancel={() => {
                setIsOpen(false)
              }}
              getContainer={() => document.getElementById('ResultDialogBox') || document.body
              }
              title={<div className="title">恭喜获得</div>}
              content={
                <div className="EquiqImgBox">
                  {
                    rewardList.map((item)=>{
                      return <div className="EquiqImgItem" key={item.tokenId}>
                        <EquipImg equip={item} width={80} height={80} />
                        <div className="EquipName">{language==='en-US'?item.en:item.name}</div>
                      </div>
                    })
                  }


                </div>
              }
            />
          </div>
        </LotteryWrapper>

      }


    </Spin>
  )
}

export default Lottery
