import { AdventureWrapper } from './style'
import Button from 'src/components/Button'
import advOne from 'src/assets/images/game/adventure/adv_one.png'
import advTwo from 'src/assets/images/game/adventure/adv_two.png'
import advThree from 'src/assets/images/game/adventure/adv_three.png'
import iconRecord from 'src/assets/images/game/adventure/icon_record.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import { useTranslation } from 'react-i18next'
import useMountedRef from 'src/utils'

import { useSetState } from 'ahooks'
import ChoseHeroModal from './components/Dialog/choseHeroModal'
import { useEffect, useState } from 'react'
// import PVEModal from './components/Dialog/pveModal'
import { HeroType } from 'src/types/hero'

import Back from 'src/components/Back'
import PVE from './components/pve/pve'
import PveLog from './components/pveLog/pveLog'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { approveDLT, approveGlod, queryApproveDLT, queryApproveGold } from 'src/web3'
import { isServerConfig } from 'src/config/switch'
export type mapType = {
  title: string,
  id:number,
  level: {
    max:number
    min:number
  },
  desc: string,
  src: string,
  index: string,
  type: 'pre' | 'started',
  onClick?:(item: mapType)=>void,
}


const Adventure: React.FC = () => {
  const { library, account } = useWeb3React()
  const advMap: mapType[] = [
    {
      title: 'adv1',
      id: 0,
      level: {
        max: 3,
        min: 1
      },
      desc: 'adv1desc',
      src: advOne,
      index: 'Ⅰ',
      type: 'started',
      onClick: (item:mapType)=>{ setChoseHeroModalInfo({visible: true, seletedAdv: item}) }
    },
    {
      id: 1,
      title: 'adv2',
      level: {
        max: 6,
        min: 4
      },
      desc: 'adv2desc',
      src: advTwo,
      index: 'Ⅱ',
      type: 'started',
      onClick: (item:mapType)=>{ setChoseHeroModalInfo({visible: true, seletedAdv: item}) }
    },
    {
      id: 98,
      title: 'adv3',
      level: {
        // max: 6,
        // min: 1
        max: 12,
        min: 7
      },
      desc: 'adv3desc',
      src: advThree,
      index: 'Ⅲ',
      // type: 'started',
      type: 'pre',
      onClick: (item:mapType)=>{ setChoseHeroModalInfo({visible: true, seletedAdv: item}) }

    }
  ]
  const [choseHeroModalInfo, setChoseHeroModalInfo] = useSetState<{
    seletedAdv:mapType,
    visible: boolean;
  }>({
    visible: false,
    seletedAdv: advMap[0]
  })
  const isNeeddltApprove=false
  const [pveShow, setPveShow] = useState(false)
  const [pveLogShow, setPveLogShow] = useState(false)
  const [selectHero, setSelectHero]=useState<HeroType>()
  const [selectLevel, setSelectLevel]=useState(0)
  // dlt授权状态
  const [dltApprove, setDltApprove] = useState<boolean>(!isNeeddltApprove)
  // gold 授权状态
  const [goldApprove, setGoldApprove] = useState<boolean>(false)
  //英雄版本
  const [heroVersion, setHeroVersion]=useState('0')
  const { t } = useTranslation()
  const mountedRef = useMountedRef()


  const renderMapDesc = (desc: string) => {
    const ct = desc.split('@')
    return ct.map(item => <p key={item}>{item}</p>)
  }
  /**
   * 授权dlt
   */
  const authorizeDlt = async () => {
    try {
      if (account) {
        await approveDLT(library, 'pve')
        setDltApprove(true)
      }
    } catch (error) {
      setDltApprove(!isNeeddltApprove)
    }
  }

  /**
     * 授权gold
     */
  const authorizeGold = async () => {
    if (account) {
      approveGlod(library, 'pve')
        .then((res) => {
          setGoldApprove(true)
        })
        .catch(() => setGoldApprove(false))
    }
  }
  useEffect(() => {
    // 先查询是否授权dlt
    if (account) {
      queryApproveDLT(library, account, 'pve')
        .then((res) => {
          if (!mountedRef.current) return
          if (res.lte(ethers.utils.parseEther('1'))) {
            setDltApprove(!isNeeddltApprove)
          } else setDltApprove(true)
        })
        .catch(() => setDltApprove(!isNeeddltApprove))
    }
  }, [account, library, mountedRef])

  // 查询 gold 授权
  useEffect(() => {
    if (account) {
      queryApproveGold(library, account, 'pve')
        .then((res) => {
          if (!mountedRef.current) return
          if (res.lte(ethers.utils.parseEther('1'))) {
            setGoldApprove(false)
          } else setGoldApprove(true)
        })
        .catch(() => {
          console.error('授权失败')
          setGoldApprove(false)
        })
    }
  }, [account, library, mountedRef])

  useEffect(() => {
    const stopScroll = (e: any) => {
      e.stopPropagation()
      // e.preventDefault();
    }
    if (pveShow) {
      const domList=document.getElementsByClassName('footer-mobile')
      if (domList[0]){
        (domList[0] as any).style.display='none'
      }

      document.body.addEventListener('touchmove', stopScroll, {
        passive: false
      })
      document.body.style.overflow = 'hidden'
    } else {
      const domList=document.getElementsByClassName('footer-mobile')
      if (domList[0]){
        (domList[0] as any).style.display=''
      }
      // document.body.removeEventListener('touchmove', stopScroll);
      document.body.addEventListener('touchmove', stopScroll, {
        passive: true
      })
      //添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
      document.body.style.overflow = 'auto'
    }
  }, [pveShow])

  return (
    <AdventureWrapper>
      {
        !pveLogShow? !pveShow?
          <>

            <div className="record" >
              <div className="flex items-center" onClick={()=>setPveLogShow(true)}>
                <img src={iconRecord} alt="" />
                <span>{t('game.adventure.history')}</span>
              </div>
            </div>
            <div className="advmap">
              {
                advMap.map(item => (
                  <div className="box" key={item.src}>
                    <i className="index">{item.index}</i>
                    <p className="title">{t(`game.adventure.${item.title}`)}</p>
                    <img src={item.src} draggable="false" alt="" />
                    <div className="desc">
                      <p className="desc-level">{`LV.${item.level.min} - LV.${item.level.max}`}</p>
                      <div className="desc-cont">
                        {renderMapDesc(t(`game.adventure.${item.desc}`))}
                      </div>
                    </div>
                    {isServerConfig? <Button
                      width="192px"
                      height="48px"
                      img={btnRedBg}
                      className="mt-5"
                      bold
                      disabled={true}
                      onClick={authorizeDlt}
                      style={{ zIndex: 1 }}
                    >
                      {t('message.serverMaintenance')}
                    </Button>:(
                      dltApprove ? (
                        goldApprove ? (
                          <Button
                            width="192px"
                            height="48px"
                            fontSize="18px"
                            bold
                            disabled={item.type === 'pre'}
                            className="mt-5"
                            img={item.type === 'started' ? btnRedBg : btnDarkBg}
                            onClick={() =>{
                              if (item.onClick){
                                item.onClick(item)
                              }
                            }}
                          >
                            {item.type === 'started' ?
                            // t('game.adventure.StAdventure') :
                              t('game.startTakingRisks') :
                              t('game.ComingSoon')}
                          </Button>
                        ) : (
                          <Button
                            width="192px"
                            height="48px"
                            img={btnRedBg}
                            className="mt-5"
                            bold
                            onClick={authorizeGold}
                            style={{ zIndex: 1 }}
                          >
                            {t('game.card.authorizeGold')}
                          </Button>
                        )
                      ) : (
                        <Button
                          width="192px"
                          height="48px"
                          img={btnRedBg}
                          className="mt-5"
                          bold
                          onClick={authorizeDlt}
                          style={{ zIndex: 1 }}
                        >
                          {t('game.card.authorizeDlt')}
                        </Button>
                      )
                    )}

                  </div>
                ))
              }
            </div>
          </>:
          <div
            className="pve-container"
          >
            <Back className='clossBack' backCall={()=>{ setPveShow(false) }} />
            <PVE isOldHero={heroVersion==='1'} selectHero={selectHero} advId={choseHeroModalInfo.seletedAdv.id} selectLevel={selectLevel} backCall={()=>{ setPveShow(false) }} />


          </div>:<div>
          <Back className='clossBack' backCall={()=>{ setPveLogShow(false) }} />
          <PveLog advMap={advMap} />
        </div>

      }


      {/* 冒险选择英雄弹窗 */}

      <ChoseHeroModal
        visible={choseHeroModalInfo.visible}
        seletedAdv={choseHeroModalInfo.seletedAdv}
        onCancelbtnClick={()=>{ setChoseHeroModalInfo({visible: false}) }}
        heroVersion={heroVersion}
        setHeroVersion={setHeroVersion}
        onOkbtnClick={(hero: HeroType, level:number)=>{
          setChoseHeroModalInfo({visible: false})
          setSelectLevel(level)
          setSelectHero(hero)
          setPveShow(true)

        }}
      />
    </AdventureWrapper>
  )
}

export default Adventure
