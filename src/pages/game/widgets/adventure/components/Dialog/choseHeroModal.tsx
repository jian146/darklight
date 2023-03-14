import { InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from 'src/components/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Option, ChoseHeroModalStyle } from './style'
import { useSetState } from 'ahooks'
import { HeroType, pve_heroType } from 'src/types/hero'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import NoData from 'src/components/NoData'
import { ModalProps, Spin, notification, message } from 'antd'
import closebtn from 'src/assets/images/common/close.png'
import btnBg from 'src/assets/images/common/btn_red.png'
import { mapType } from '../..'
import { useWeb3React } from '@web3-react/core'

import { subTokenId } from 'src/utils'
import { checkGold } from 'src/web3'
import { getPveHeroList } from 'src/web3/pve'
import { attributesType, t_attribute } from 'src/utils/attributeSetting'
import { getServerStatus } from 'src/pages/api/request'
import { mapType_price } from '../../../arena'

interface I_ChoseHeroModal extends ModalProps {
  onCancelbtnClick: () => void;
  onOkbtnClick: (hero:HeroType, level:number) => void;
  heroVersion:string
  setHeroVersion:(heroVersion:string)=>void
  seletedAdv: mapType|mapType_price;
}
const ChoseHeroModal: React.FC<I_ChoseHeroModal> = (
  props: I_ChoseHeroModal
) => {
  const { onCancelbtnClick, onOkbtnClick, seletedAdv, heroVersion, setHeroVersion } = props
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const [loading, setLoading] = useState(false)
  const [heroList, setHeroList] = useState<pve_heroType[]>([])

  const heroCharacterList = [
    {
      lable: t('home.warrior'),
      value: 0
    },
    {
      lable: t('home.mage'),
      value: 1
    },
    {
      lable: t('home.hunter'),
      value: 2
    },
    {
      lable: t('home.assassin'),
      value: 3
    }
  ]
  const heroVersionList = [
    {
      lable: 'v2.0',
      value: '0'
    },
    {
      lable: 'v1.0',
      value: '1'
    }

  ]
  const [filtterOccupation, setFiltterOccupation] = useState<string>('')

  const [selHeroAttr, setSelHeroAttr] = useSetState<{
    selHeroId: string;
    level: string | undefined;
    hero?: HeroType;
  }>({
    selHeroId: '',
    hero: undefined,
    level: undefined
  })

  /**
 * 获取英雄
 */
  const getMyHeros = useCallback((isOld:boolean) => {

    if (account) {
      setLoading(true)
      // 获取所有英雄
      getPveHeroList(library, isOld).then((res:pve_heroType[]) => {
        const list=res.sort((a, b) => {
          return a.total - b.total
        })
        setHeroList(list)
      }).catch(error => {
        notification.error({
          message: 'Error',
          description: error?.message
        })
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [account, heroVersion])
  useEffect(() => {
    if (props.visible){
      getMyHeros(heroVersion==='1')
    } else {
      setSelHeroAttr({
        selHeroId: '',
        hero: undefined,
        level: undefined
      })
      setFiltterOccupation('')
    }

  }, [account, props.visible])


  //渲染范围
  const getLevelRange = () => {
    const domArr: JSX.Element[] = []
    for (let i = seletedAdv.level.min; i <= seletedAdv.level.max; i++) {
      domArr.push(
        <Option key={i} value={i}>
          <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">LV.{i}</div>
        </Option>
      )
    }
    return domArr
  }

  const getFilterHeroList= (heroList.filter((item)=>(
    filtterOccupation!==''&&item.occupation+''===filtterOccupation)
  &&((!!selHeroAttr.level)&&item.level>=parseInt(selHeroAttr.level))
  // &&item.pveCount>0
  )).sort((a, b) => {
    return b.pveCount - a.pveCount
  }).sort((a, b) => {
    return b.total - a.total
  }).sort((a, b) => {
    return b.level - a.level
  })
  const goldPrice=!selHeroAttr.level?0: parseInt(selHeroAttr.level)*1000


  return (
    <ChoseHeroModalStyle
      width={500}
      title={null}
      centered
      maskClosable={false}
      destroyOnClose
      closable={false}
      footer={null}
      {...props}
    >
      <Spin spinning={loading}>


        {/* 标头 */}
        <p style={{ color: '#B2856C' }} className="text-center text-xl">
          {t(`game.adventure.${seletedAdv?.title}`)}
        </p>
        {/* 关闭按钮 */}
        <img
          className="w-8 absolute right-0 top-0 cursor-pointer"
          alt=""
          src={closebtn}
          onClick={() => {
            onCancelbtnClick()
          }}
        ></img>
        <div className="formBox">
          {/* 地图等级 */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('game.adventure.dungeonLevel')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t('game.magic.choseHero')}
              value={selHeroAttr.level}
              IconComponent={KeyboardArrowDownIcon}
              onChange={(event)=>{
                setSelHeroAttr({
                  level: event.target.value,
                  selHeroId: '',
                  hero: undefined
                })
                setFiltterOccupation('')
              }}
              MenuProps={{
                PaperProps: {
                  className: 'custom-scrollbar',
                  style: {
                    maxHeight: 300,
                    backgroundColor: '#2C2624'
                  }
                }
              }}
            >
              {getLevelRange()}
            </Select>
          </FormControl>
          {/* 英雄版本 */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('game.adventure.heroVersion')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t('game.magic.choseHero')}
              value={heroVersion}
              IconComponent={KeyboardArrowDownIcon}
              onChange={(event) => {
                setSelHeroAttr({
                  selHeroId: '',
                  hero: undefined
                })
                setFiltterOccupation('')
                setHeroVersion(event.target.value)
                getMyHeros(event.target.value==='1')


              }}
              MenuProps={{
                PaperProps: {
                  className: 'custom-scrollbar',
                  style: {
                    maxHeight: 300,
                    backgroundColor: '#2C2624'
                  }
                }
              }}
            >
              {heroVersionList.map((item) => (
                <Option key={item.value} value={item.value + ''}>
                  <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">
                    {item.lable}
                  </div>
                </Option>
              ))}
              {heroVersionList.length === 0 && <NoData />}
            </Select>
          </FormControl>


          {/* 英雄职业 */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('game.adventure.heroCharacter')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t('game.magic.choseHero')}
              value={filtterOccupation + ''}
              IconComponent={KeyboardArrowDownIcon}
              onChange={(event) => {
                setFiltterOccupation(event.target.value)
              }}
              MenuProps={{
                PaperProps: {
                  className: 'custom-scrollbar',
                  style: {
                    maxHeight: 300,
                    backgroundColor: '#2C2624'
                  }
                }
              }}
            >
              {heroCharacterList.map((item) => (
                <Option key={item.value} value={item.value + ''}>
                  <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">
                    {item.lable}
                  </div>
                </Option>
              ))}
              {heroCharacterList.length === 0 && <NoData />}
            </Select>
          </FormControl>
          {/* token id */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Token ID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t('game.magic.choseHero')}
              value={selHeroAttr.hero?.tokenId??''}
              IconComponent={KeyboardArrowDownIcon}
              onChange={(event)=>{
                const selHeroId = event.target.value
                const selHero = heroList.find((item:pve_heroType) => item.tokenId === selHeroId)
                if (!selHero||selHero?.pveCount===0){
                  return
                }
                setSelHeroAttr({
                  hero: selHero
                })

              }}
              MenuProps={{
                PaperProps: {
                  className: 'custom-scrollbar',
                  style: {
                    maxHeight: 300,
                    backgroundColor: '#2C2624'
                  }
                }
              }}
            >
              {
                getFilterHeroList.map((hero, index)=>{
                  return <Option key={index}
                    value={hero.tokenId}
                    disabled={hero.pveCount===0}
                  >
                    <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">
                      {subTokenId(hero?.tokenId, 5)} [LV.{hero.level} {t('game.backpack.All')}:{hero.total} {t('game.heros.main')}:{hero[attributesType[hero.occupation].main as t_attribute]} {t('game.heros.sub')}:{hero[attributesType[hero.occupation].sub as t_attribute]}]
                      {`${t('game.adventure.Times')}:${hero.pveCount}`}
                    </div>
                  </Option>
                })
              }


              {getFilterHeroList.length === 0 && <NoData />}
            </Select>
          </FormControl>
        </div>
        {/* 收益 */}
        <div
          style={{
            color: '#B2856C'
          }}
        >

          {
            <p>Gold：{goldPrice}</p>
          }

        </div>
        <div className="flex justify-center pb-4">
          <Button
            width="192px"
            height="48px"
            fontSize="18px"
            bold
            className="mt-5"
            img={btnBg}
            disabled={!selHeroAttr.hero||!selHeroAttr?.level }
            onClick={ async () =>{
              setLoading(true)

              if (!await checkGold(library, goldPrice)){
                message.info(t('message.gold_Insufficient'))
                setLoading(false)
                return
              }

              if (!await getServerStatus()){
                message.info(t('message.serverError'))
                console.error('服务异常')
                setLoading(false)
                console.timeEnd()
                return
              }
              !!selHeroAttr.hero&&await onOkbtnClick(selHeroAttr.hero, parseInt(selHeroAttr?.level?selHeroAttr.level:'0'))
              setLoading(false)
            }}
          >
            {t('game.adventure.determine')}
          </Button>
        </div>
      </Spin>
    </ChoseHeroModalStyle>
  )
}

export default ChoseHeroModal
