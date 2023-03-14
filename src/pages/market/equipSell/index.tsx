import { useEffect, useState, useCallback } from 'react'
import Container, {Option} from './style'
import buyHeroBg from 'src/assets/images/market/buy_hero_bg.png'

import Back from 'src/components/Back'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import InputAdornment from '@mui/material/InputAdornment'
import { useSafeState, useSetState } from 'ahooks'
import Button from 'src/components/Button'
import btnBg from 'src/assets/images/common/btn_red.png'
import { useWeb3React } from '@web3-react/core'
import { message, notification, Spin } from 'antd'
import { queryAndApprove } from 'src/web3'
import { subTokenId } from 'src/utils'

import { useTranslation } from 'react-i18next'

import NoData from 'src/components/NoData'
import { useNavigate } from 'react-router'
import { I_Equip } from 'src/pages/game/widgets/backpack'
import { getMyEquipsApi } from 'src/pages/api/equip'
import ChoseEquip from 'src/pages/game/widgets/forge/components/choseEquip'
import { sellEquipAbi } from 'src/web3/marketEquip'
import { getEquipImg } from 'src/pages/game/widgets/backpack/equipUtils'
import { errorLog } from 'src/utils/log'
const PublishHero: React.FC = () => {

  const { account, library } = useWeb3React()
  const { t, i18n: {language}} = useTranslation()
  const navigate= useNavigate()
  const [selHeroAttr, setSelHeroAttr] = useSetState<{
    selHeroId: string,
    occupation: number | undefined,
    equip?: I_Equip
  }>({
    selHeroId: '',
    equip: undefined,
    occupation: undefined
  })
  const [loading, setLoading] = useSafeState<boolean>(true)

  const [price, setPrice] = useState('')
  const [equipList, setEquipList] = useSafeState<I_Equip[]>([])

  const [isShowChoseEquip, setIsShowChoseEquip] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const clearPage = () => {
    setPrice('')
    setSelHeroAttr({
      selHeroId: '',
      equip: undefined,
      occupation: undefined
    })
  }


  const getMyEuipList = useCallback(async () => {

    if (account) {
      setLoading(true)
      // 获取所有英雄

      const myAddress =await library.getSigner().getAddress()
      getMyEquipsApi(myAddress, 2).then((res:I_Equip[]) => {

        setEquipList(res)
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
  }, [account])
  useEffect(() => {
    getMyEuipList()
  }, [account])

  const handlePriceInput = (event: any) => {
    setPrice(event.target.value)
  }

  const handleChange = (event: SelectChangeEvent) => {
    //这个方法将被阻断
    const selHeroId = event.target.value
    const selHero = equipList.find(item => item.tokenId === selHeroId)
    setSelHeroAttr({
      selHeroId,
      occupation: 0,
      equip: selHero
    })
  }

  const publichHero = async () => {
    if (!account) return
    setLoading(true)

    try {
      const dltIsPass = await queryAndApprove(
        library,
        account,
        'marketEquip',
        'dlt'
      )
      if (!dltIsPass) {
      //授权失败
        message.warn(t('message.privilegeGrantFailed'))
        return
      }
    } catch (error) {
      errorLog('授权装备', error)

    }
    sellEquipAbi(library, selHeroAttr.selHeroId, price)
      .then(() => {
        notification.success({
          message: 'Success',
          description: t('success')
        })
        clearPage()
        return getMyEuipList()
      })
      .catch(error => {
        setLoading(false)
        notification.error({
          message: 'Error',
          description: error?.message
        })
      })


  }
  const onChoseEquip = (equip: I_Equip) => {
    setLoading(false)
    setSelHeroAttr({
      selHeroId: equip.tokenId,
      equip: equip
    })
    setIsShowChoseEquip(false)
  }
  const getEquipInfo= () => {
    if ( !selHeroAttr.equip) return ''
    return selHeroAttr.equip.tokenId
  }

  const getAttrText=(equipItem:I_Equip)=>{
    let attrText=''
    attrText+=equipItem.dbrk+equipItem.rbrk>0?`${t('game.backpack.InjuryMultiple')}:${(equipItem.dbrk+equipItem.rbrk)}% `:''
    attrText+=equipItem.dmg>0?`${ t('game.backpack.PhysicalAttack')}:${equipItem.dmg} `:''
    attrText+=equipItem.mag>0?`${ t('game.backpack.MagicAttack')}:${equipItem.mag} `:''
    attrText+=equipItem.def>0?`${ t('game.backpack.Defense')}:${equipItem.def} `:''
    attrText+=equipItem.res>0?`${ t('game.backpack.Resistance')}:${equipItem.res} `:''
    attrText+=equipItem.hp>0?`${ t('game.backpack.HP')}:${equipItem.hp} `:''
    attrText+=equipItem.str>0?`${ t('game.strength_s')}:${equipItem.str} `:''
    attrText+=equipItem.spt>0?`${ t('game.mind_s')}:${equipItem.spt} `:''
    attrText+=equipItem.agi>0?`${ t('game.agility_s')}:${equipItem.agi} `:''
    attrText+=equipItem.wil>0?`${ t('game.will_s')}:${equipItem.wil} `:''
    attrText+=equipItem.con>0?`${ t('game.stamina_s')}:${equipItem.con} `:''
    attrText+=equipItem.inte>0?`${ t('game.intelligence_s')}:${equipItem.inte} `:''


    return attrText
  }

  const getSimpleAttr = useCallback((equipItem?: I_Equip) => equipItem ?
    getAttrText(equipItem)

    : '', [t])


  return (
    <Container>
      <Back backCall={()=>{ navigate('/market?marketType=equip') }} />

      <Spin spinning={loading}>


        <div className="flex md:mt-20 mt-5 justify-center flex-wrap-reverse relative">
          {/* 选择英雄框 */}
          {isShowChoseEquip && (
            <ChoseEquip
              className={'top-0'}
              useList={equipList.filter((item)=>item.tokenId!==selHeroAttr?.equip?.tokenId)}
              setLoading={setLoading}
              setVisible={setIsShowChoseEquip}
              onChoseEquip={onChoseEquip}
              filterList={[]}
            />
          )}
          <div className="left md:mr-44 w-full md:w-440px mt-8 md:mt-0 relative">

            <div className="bg relative">

              <img src={buyHeroBg} alt="" />
              {/* 图片 */}
              <img className="equip-img absolute top-1/2 left-1/2 mt-8 transform -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-100" src={ selHeroAttr.equip?getEquipImg(selHeroAttr.equip.name):''} alt="" />
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

            <div className="mt-8 relative">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  { t('market.equip.selectEquipment') }
                </InputLabel>
                <div className='selectTrggerDom'
                  onClick={(e) =>{
                    e.stopPropagation()
                    setIsShowChoseEquip(true)

                  }}
                >

                </div>
                <Select
                  // disabled
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  label={t('market.equip.selectEquipment')}
                  value={getEquipInfo()}
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
                    equipList.map(item => (
                      <Option key={item.tokenId} value={item.tokenId}><span className="name">{language==='en-US'?item.en:item.name} <span className="subName">({item.castLv}/{item.forge})</span></span>
                      </Option>

                    ))
                  }
                  {/* <Option key={item.tokenId} value={item.tokenId}>
                        <div className="text-B28465 text-xs md:text-sm pt-4 pb-5">
                          { renderHeroList(item) }
                        </div>
                      </Option> */}
                  {
                    equipList.length === 0 && <NoData />
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
                    value={`${t('market.contractAddress')}: ${selHeroAttr?.equip?subTokenId(selHeroAttr.equip?.tokenId, 12):''}`}
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
                    label= { t('market.equip.equipmentAttributes') }
                    variant="outlined"
                    value={getSimpleAttr(selHeroAttr.equip)}
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
                  onClick={publichHero}
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
