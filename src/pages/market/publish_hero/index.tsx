import { useEffect, useState, useCallback } from 'react'
import Container, { Option } from './style'
import buyHeroBg from 'src/assets/images/market/buy_hero_bg.png'

import Back from 'src/components/Back'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import InputAdornment from '@mui/material/InputAdornment'
import { useGetState, useSafeState, useSetState } from 'ahooks'
import Button from 'src/components/Button'
import btnBg from 'src/assets/images/common/btn_red.png'
import defaultImg from 'src/assets/images/market/defult-img.png'
import { useWeb3React } from '@web3-react/core'
import { myHerosNew } from 'src/web3/hero'
import { HeroAttrList, HeroType, Occupations } from 'src/types/hero'
import { message, notification, Spin } from 'antd'
import { approveNtf, queryApproveNft } from 'src/web3'
import { subTokenId } from 'src/utils'
import RenderSpecTitle from 'src/pages/game/widgets/heros/renderSpecTitle'
import { useTranslation } from 'react-i18next'
import { sellHero } from 'src/web3/market'
import NoData from 'src/components/NoData'
import NoviceImgMark from 'src/components/NoviceImgMark'
import HeroImg from 'src/components/Hero/HeroImg'
import { useNavigate } from 'react-router'
import { getPutTakeEquipSignApi, queryHeroEquipApi, takeOffEquipApi } from 'src/pages/api/backpack'
import { I_Equip_position } from 'src/pages/game/widgets/backpack'
import { getSigner } from 'src/web3/equip'
import Confirm from 'src/components/Confirm/Confirm'
const PublishHero: React.FC = () => {

  const { account, library } = useWeb3React()
  const { t } = useTranslation()
  const navigate= useNavigate()
  const [selHeroAttr, setSelHeroAttr] = useSetState<{
    selHeroId: string,
    occupation: number | undefined,
    hero?: HeroType
  }>({
    selHeroId: '',
    hero: undefined,
    occupation: undefined
  })
  const [pageLoading, setPageLoading] = useSafeState<boolean>(true)
  const [price, setPrice] = useState('')
  const [heros, setHeros] = useSafeState<HeroType[]>([])
  const [, setNftState, getState] = useGetState(false)
  const [isShowCon, setIsShowCon]=useState(false)
  const [heroEquipList, setHeroEquipList]=useState<I_Equip_position[]>([])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const clearPage = () => {
    setPrice('')
    setSelHeroAttr({
      selHeroId: '',
      hero: undefined,
      occupation: undefined
    })
  }

  useEffect(() => {
    if (account) {
      // 查询 nft 授权
      queryApproveNft(library, account).then(res => {
        setNftState(res)
      }).catch(error => {
        notification.error({
          message: 'Error',
          description: error?.message
        })
      })
    }
  }, [account])

  const getMyHeros = useCallback(() => {
    if (account) {
      // 获取所有英雄
      myHerosNew(library).then(res => {
        const list=res.sort((a, b) => {
          return a.total - b.total
        })

        setHeros(list)
      }).catch(error => {
        notification.error({
          message: 'Error',
          description: error?.message
        })
      }).finally(() => {
        setPageLoading(false)
      })
    }
  }, [account])
  useEffect(() => {
    getMyHeros()
  }, [getMyHeros])

  const handlePriceInput = (event: any) => {
    setPrice(event.target.value)
  }

  const handleChange = async (event: SelectChangeEvent) => {
    const selHeroId = event.target.value
    const selHero = heros.find(item => item.tokenId === selHeroId)
    if (selHero?.tokenId){
      await getHeroEquipList(selHero?.tokenId)
    }

    setSelHeroAttr({
      selHeroId,
      occupation: selHero?.occupation,
      hero: selHero
    })
  }

  const publichHero = () => {
    if (!account) return
    setPageLoading(true)

    // 已经授权 ntf 直接发布英雄
    if (getState()) {

      sellHero(library, selHeroAttr.selHeroId, price)
        .then(() => {
          notification.success({
            message: 'Success',
            description: t('success')
          })
          clearPage()
          return getMyHeros()
        })
        .catch(error => {
          setPageLoading(false)
          notification.error({
            message: 'Error',
            description: error?.message
          })
        })
    } else {
      approveNtf(library).then(() => {
        setNftState(true)
        publichHero()
      }).catch(error => {
        setNftState(false)
        notification.error({
          message: 'Error',
          description: error?.message
        })
      })
    }
  }

  /**
   * @description 返回主副属性的jx函数
   * @param occupation 职业
   * @param mType 主属性的类型
   * @param mVal 主属性的值
   * @param sType 副属性的类型
   * @param sVal 副属性的值
   * @returns JSX.Element
   */
  const jsxPrimaryAttr = (
    occupation: Occupations,
    mType: keyof typeof HeroAttrList,
    mVal: number,
    sType: keyof typeof HeroAttrList,
    sVal: number,
    hero: Omit<HeroType, 'occupation'>
  ): JSX.Element => (
    <>
      <span>
        {t(`home.${Occupations[occupation]}`)}
        <span className="ml-1">LV.{hero.level}</span>
      </span>
      <span className="ml-1 md:ml-3">
        {t('game.total')} <span className="text-ecae18">{hero.total}</span>
      </span>
      <span className="ml-1 md:ml-3">
        <span>{t('game.heros.main')}</span>
        <RenderSpecTitle type={mType} hero={hero as HeroType} />
        <span className="ml-1 text-ecae18">{ mVal }</span>
      </span>
      <span className="ml-1 md:ml-3">
        <span>{t('game.heros.sub')}</span>
        <RenderSpecTitle type={sType} hero={hero as HeroType} />
        <span className="ml-1 text-ecae18">{ sVal }</span>
      </span>
      <span className="ml-1 md:ml-3">
        {t('game.FatigueValue')} <span className="text-valueColor">{hero.fatigue}</span></span>
    </>
  )

  /**
     * @description 渲染主副属性
     * @param param 英雄属性
     * @returns JSX.Element | undefined
     */
  const renderHeroList = ({ occupation, ...item }: HeroType): JSX.Element | undefined => {
    if (occupation === Occupations.warrior) {
      // 骑士 力量 体质
      return jsxPrimaryAttr(
        occupation,

        'stamina',
        item.stamina,
        'strength',
        item.strength,
        item
      )
    }

    if (occupation === Occupations.assassin) {
      // 刺客 敏捷 力量
      return jsxPrimaryAttr(
        occupation,
        'agility',
        item.agility,
        'strength',
        item.strength,
        item
      )
    }

    if (occupation === Occupations.mage) {
      // 法师 智力  精神
      return jsxPrimaryAttr(
        occupation,
        'intelligence',
        item.intelligence,
        'mind',
        item.mind,
        item
      )
    }

    if (occupation === Occupations.hunter) {
      // 猎人 力量 敏捷
      return jsxPrimaryAttr(
        occupation,
        'strength',
        item.strength,
        'agility',
        item.agility,
        item
      )
    }
  }


  const getHeroEquipList=async(heroId:string)=>{
    if (!heroId) return
    // setHeroEquipList([])
    const res=await queryHeroEquipApi(heroId)
    if (res){
      setHeroEquipList(res.equips)

    }

  }
  /**
   * 一键卸载装备
   */
  const putEquip=async()=>{

    const id=selHeroAttr.selHeroId
    if (account && id) {
      const myAddress =await library.getSigner().getAddress()
      const positionList:number[]=[], tokenIdList:string[]=[]
      heroEquipList.forEach((item)=>{
        positionList.push(item.position)
        tokenIdList.push(item.equip.tokenId)
      })
      const apiSign=await getPutTakeEquipSignApi(myAddress, id, tokenIdList)
      const sign=await getSigner(library, apiSign)
      if (!sign){
        return message.error(t('message.privilegeGrantFailed'))
      }
      const res=await takeOffEquipApi(myAddress, id, tokenIdList, positionList, sign)
      if (res){
        publichHero()

      }
      setIsShowCon(false)
    }


  }

  const getSimpleAttr = useCallback((hero?: HeroType) => hero ?
    `${t('game.sStrength')} ${hero.strength} / ${t('game.sAgility')} ${hero.agility} / ${t('game.sStamina')} ${hero.stamina} / ${t('game.sWill')} ${hero.will} / ${t('game.sIntelligence')} ${hero.intelligence} / ${t('game.sMind')} ${hero.mind}`
    : '', [t])


  return (
    <Container>
      <Back backCall={()=>{ navigate('/market') }} />
      <Spin spinning={pageLoading}>
        {/* 询问弹窗 */}
        <Confirm visible={isShowCon} title="Info" okText={t('confirm')} onOk={()=>{ putEquip() }} onCancel={()=>{ setPageLoading(false); setIsShowCon(false) }} >
          <div className="initMessage text-center">{t('game.heros.transferEquipMessage')}</div>
        </Confirm>

        <div className="flex md:mt-20 mt-5 justify-center flex-wrap-reverse ">

          <div className="left md:mr-44 w-full md:w-440px mt-8 md:mt-0 relative">
            {selHeroAttr?.hero?.newbie && (
              <NoviceImgMark
                className="mark "
                style={{
                  zIndex: 50
                }}
                top={15}
                right={15}
                height={45}
              />
            )}
            <div className="bg relative">

              <img src={buyHeroBg} alt="" />
              <HeroImg className="absolute top-1/2 left-1/2 mt-8 transform
                        -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-110"
              occupation={selHeroAttr.occupation}
              src={!selHeroAttr.occupation&&selHeroAttr.occupation!==0?defaultImg:undefined}
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
                <span className="text-primary text-22px">
                  { t('market.preview') }
                </span>
              </div>
            </div>
          </div>
          <div className="right w-full md:w-492px mt-6 md:mt-0 md:bg-130F0E md:px-9 md:py-6">
            <div className="text-center">
              <span className="title text-2xl relative text-primary">
              NFT
              </span>
            </div>

            <div className="mt-8">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  { t('game.magic.choseHero') }
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={t('game.magic.choseHero')}
                  value={selHeroAttr.selHeroId}
                  IconComponent={KeyboardArrowDownIcon}
                  onChange={handleChange}
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
                    heros.map(item => (
                      <Option key={item.tokenId} value={item.tokenId}>
                        <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">
                          { renderHeroList(item) }
                        </div>
                      </Option>
                    ))
                  }
                  {
                    heros.length === 0 && <NoData />
                  }
                </Select>
              </FormControl>

              <div className="mt-6">
                <Box
                  component="form"
                  noValidate
                  width="100%"
                  autoComplete="off"
                >
                  <TextField
                    fullWidth
                    label={t('market.contractAddress')}
                    variant="outlined"
                    value={`${t('market.contractAddress')}: ${selHeroAttr?.hero?subTokenId(selHeroAttr.hero?.tokenId, 12):''}`}
                    InputProps={{
                      readOnly: false
                    }}
                  />
                </Box>
              </div>

              <div className="mt-6">
                <Box
                  component="form"
                  noValidate
                  width="100%"
                  autoComplete="off"
                >
                  <TextField
                    fullWidth
                    label={t('market.attributes')}
                    variant="outlined"
                    value={getSimpleAttr(selHeroAttr.hero)}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </div>

            </div>

            <div className="text-center mt-12">
              <span className="title text-2xl relative text-primary">
              Token
              </span>
            </div>

            <div className="mt-8">
              <Box
                component="form"
                noValidate
                width="100%"
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  label={ t('market.tAddr') }
                  variant="outlined"
                  // value={`DLT: ${selHeroAttr.selHeroId && subTokenId(selHeroAttr.selHeroId, 12)}`}
                  value={`DLT: ${process.env.REACT_APP_DLT_ADDR}`}
                  InputProps={{
                    readOnly: false
                  }}
                />
              </Box>

              <div className="mt-6">
                <Box
                  component="form"
                  noValidate
                  width="100%"
                  autoComplete="off"
                >
                  <TextField
                    fullWidth
                    label={t('market.price')}
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={handlePriceInput}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <span className="text-secondary">DLT</span>
                      </InputAdornment>
                    }}
                  />
                </Box>
              </div>
              <div className="text-center mt-5">
                <Button
                  width="184px"
                  height="46px"
                  fontSize="18px"
                  img={btnBg}
                  disabled={price === '' || selHeroAttr.selHeroId === ''}
                  onClick={ ()=>{
                    if (heroEquipList.length>0){
                      setIsShowCon(true)
                      return
                    }
                    publichHero()
                  }}
                >
                  { t('game.card.Receive') }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </Container>
  )
}

export default PublishHero
