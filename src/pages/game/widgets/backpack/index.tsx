import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { MTab, MTabs, BackPackWrapper, BackPackForgeWrapper } from './style'
import roleDecorator from 'src/assets/images/game/hero/role_decorator.png'
import attackImg from 'src/assets/images/game/backpack/attack.png'
import guardImg from 'src/assets/images/game/backpack/guard.png'
import lifeImg from 'src/assets/images/game/backpack/life.png'
import mageImg from 'src/assets/images/game/backpack/mage.png'
import strengthImg from 'src/assets/images/game/hero/strength.png'
import agilityImg from 'src/assets/images/game/hero/agility.png'
import staminaImg from 'src/assets/images/game/hero/stamina.png'
import willImg from 'src/assets/images/game/hero/will.png'
import intelligenceImg from 'src/assets/images/game/hero/intelligence.png'
import mindImg from 'src/assets/images/game/hero/mind.png'
import { useTranslation } from 'react-i18next'
import herodbg from 'src/assets/images/game/backpack/hero_d_bg.png'
import ChoseHero from '../alchemy/components/choseHero'
import { message, Spin } from 'antd'
import { HeroType } from 'src/types/hero'
import HeroImg from 'src/components/Hero/HeroImg'
import EquipmentDialog from 'src/components/Dialog/equipmentDialog/equipmentDialog'
import { getInfosApi, getMyEquipsApi } from 'src/pages/api/equip'
import { useWeb3React } from '@web3-react/core'
import { getEquipImg } from './equipUtils'
import EquipImg from 'src/components/EquipImg/equipImg'
import { getPutTakeEquipSignApi, putOnEquipApi, queryHeroEquipApi, takeOffEquipApi } from 'src/pages/api/backpack'
import { getSigner } from 'src/web3/equip'
import { subTokenId } from 'src/utils'
import Forge, { I_Equip_key } from '../forge'
import Back from 'src/components/Back'
// import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { formatTime } from 'src/utils/timeHelper'

// export interface I_EquiqPosition{
//   "装备位置 equip
// [0]=左持// [1]=右持// [2]=头// [3]=护符// [4]=套装// [5]=手// [6,7]=戒指// [8]=腰带// [9]=鞋"

// "适用职业 class
// [0]=骑士// [1]=刺客// [2]=法师// [3]=猎人// [4]=其他// 多职可用如下 // [0,1]=骑士,刺客"
// "装备种类// 0=weapon// 1=sub-weapon// 2=helm// 3=amulet// 4=armor// 5=gloves// 6=ring// 7=belt// 8=boots"
/**
 * 装备
 */
export interface I_Equip {
  //武器类别ID
  id: number
  // <10时表示为一个钥匙, 2^8-1时为一个装备
  key: number
  tokenId:string
  name: string
  en: string

  // 有ID时，可以固定属性
  //条件等级
  lv:number
  //职业
  class:number[]
  //装备位置
  equip:number
  //装备种类
  etype:number
  //稀有度
  rarity:number
  //可锻造等级
  forge:number
  //力量
  str:number
  //敏捷
  agi:number
  //体质
  con:number
  //智力
  inte:number
  //精神
  spt:number
  //意志
  wil:number
  //物伤攻击倍数,*100后的整数
  dbrk:number
  //法伤倍数
  rbrk:number
  //物攻
  dmg:number
  //法攻
  mag:number
  //生命
  hp:number
   //物防
  def:number
  //法防
  res:number
  //铸造等级
  castLv: number,
  //已经改变的属性
  casts: number[ ],
  //可以铸造的属性
  canForgeAttrs:string [ ]
  //冷却时间
  coldTime:number
  destory:boolean

}
export const initEquip:I_Equip={
  id: 999,
  // <10时表示为一个钥匙, 2^8-1时为一个装备
  key: 999,
  tokenId: 'initKey',
  name: '',
  en: '',
  destory: false,
  // 有ID时，可以固定属性
  //条件等级
  lv: 1,
  //职业
  class: [],
  //装备位置
  equip: 0,
  //装备种类
  etype: 0,
  //稀有度
  rarity: 1,
  //可锻造等级
  forge: 0,
  //力量
  str: 0,
  //敏捷
  agi: 0,
  //体质
  con: 0,
  //智力
  inte: 0,
  //精神
  spt: 0,
  //意志
  wil: 0,
  //物伤攻击倍数,*100后的整数
  dbrk: 0,
  //法伤倍数
  rbrk: 0,
  //物攻
  dmg: 0,
  //法攻
  mag: 0,
  //生命
  hp: 0,
  //物防
  def: 0,
  //法防
  res: 0,
  //铸造等级
  castLv: 0,
  //已经改变的属性
  casts: [],
  //可以铸造的属性
  canForgeAttrs: [],
  coldTime: 0
}

export interface I_Equip_position{
  position: number
  equip: I_Equip
}
export interface I_HeroEquip extends HeroType {
  //10个孔位分别有什么装备
  equips:(I_Equip_position)[]

  //应用了装备后的属性
   //攻击伤害 (物攻或法攻)
  DMG:number
  //魔法伤害
  MAG:number
  //生命
  HP:number
  //物防
  DEF:number
  //法防
  RES:number
}
const Backpack: React.FC = () => {
  const heroEquipStyles={
    width: 56,
    height: 56
  }
  //   "装备位置 equip
  // [0]=左持// [1]=右持// [2]=头// [3]=护符// [4]=套装// [5]=手// [6,7]=戒指// [8]=腰带// [9]=鞋"
  const initHeroEquip=[null, null, null, null, null, null, null, null, null, null]
  const initHeroAttr:I_HeroEquip={
    strength: 0,
    agility: 0,
    stamina: 0,
    will: 0,
    intelligence: 0,
    mind: 0,
    //
    occupation: 0,
    tokenId: '',
    level: 1,
    fatigue: 0,
    total: 0,
    newbie: false,

    //物攻
    DMG: 0,
    MAG: 0,
    //生命
    HP: 0,
    //物防
    DEF: 0,
    //法防
    RES: 0,
    equips: []
  }
  const { account, library } = useWeb3React()
  const [value, setValue] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [hero, setHero] = useState<HeroType>()
  const [isShowChoseHero, setIsShowChoseHero] = useState(false)
  const [isShowDetail, setIsShowDetail] = useState(false)
  const [isShowForge, setIsShowForge]=useState(false)
  const [selectEquip, setSelectEquip]=useState<I_Equip>()
  const [myEquipList, setMyEquipList] = useState<I_Equip[]>([])
  const [modelbtnType, setModelbtnType] = useState<'on'|'down'|''>('')
  const [heroAttr, setHeroAttr]=useState<I_HeroEquip>(initHeroAttr)
  const [isLeftRing, setIsLeftRing]=useState(false)
  const [isShowBackBtn, setIsShowBackBtn]=useState(true)
  /**
   * 已装备数组 [0]=左持// [1]=右持// [2]=头// [3]=护符// [4]=套装// [5]=手// [6,7]=戒指// [8]=腰带// [9]=鞋"
   */
  const [heroEquipList, setHeroEquipList]=useState<(I_Equip|null)[]>(initHeroEquip)

  const { t } = useTranslation()


  /**
   * 获取所穿戴装备的所有属性
   * @returns 装备累加属性
   */
  const getEquipAttr = useCallback(() => {
    //物攻 法攻 生命 物防 法防
    const backEquip:I_Equip =JSON.parse(JSON.stringify(initEquip))
    heroEquipList.forEach((item)=>{
      if (item){
        backEquip.str+=item.str
        backEquip.agi+=item.agi
        backEquip.con+=item.con
        backEquip.inte+=item.inte
        backEquip.spt+=item.spt
        backEquip.wil+=item.wil
        backEquip.dbrk+=item.dbrk
        backEquip.rbrk+=item.rbrk
        backEquip.dmg+=item.dmg
        backEquip.mag+=item.mag
        backEquip.hp+=item.hp
        backEquip.def+=item.def
        backEquip.res+=item.res
      }
    })
    return backEquip
  }, [heroEquipList])


  const equipAttr=getEquipAttr()

  useEffect(() => {
    getMykey()

  }, [account, library, isShowForge])


  const getMykey=async()=>{
    if (account){
      setLoading(true)
      const myAddress =await library.getSigner().getAddress()
      const res=await getMyEquipsApi(myAddress, 2)
      setMyEquipList(res)
      setLoading(false)
    }

  }


  const getHeroEquipList=async(heroData=hero)=>{
    if (!heroData) return

    setLoading(true)
    // setHeroEquipList([])
    const res=await queryHeroEquipApi(heroData.tokenId)
    if (res){
      const newList:(I_Equip|null)[]=initHeroEquip
      res.equips.forEach((item)=>{
        newList[item.position]=item.equip
      })
      setHeroEquipList([...newList])
      setHeroAttr(res)
    }
    setLoading(false)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const onChoseHero = (hero: HeroType) => {
    setLoading(true)
    setHero(hero)
    getHeroEquipList(hero)
    setIsShowChoseHero(false)

  }


  const getEquipPostion = (equip:I_Equip, isOn:boolean):number => {
    let position =equip.equip
    const isRing=equip.equip>=6&&equip.equip<=7
    if (isRing){
    //是戒指
      if (isOn){
        !heroEquipList[6]||!!(heroEquipList[6]&&heroEquipList[7])?position=6:position=7

      } else {
        //下装备
        isLeftRing?position=6:position=7
      }

    }
    return position
  }

  const getEquipDate=async(tokenId:string)=>{
    if (tokenId){
      setLoading(true)
      try {
        const res=await getInfosApi([tokenId])
        if (res&&res[0]){
          setLoading(false)
          return res[0]
        } else {
          setLoading(false)
          return null
        }
      } catch (error) {
        setLoading(false)
        return null
      }


    }


  }
  //穿上装备
  const onEquip= async (equip:I_Equip, position:number)=>{
    // let installPostionIndex=equip.equip
    // const isRing=equip.equip>=6&&equip.equip<=7
    // if (isRing){
    // //是戒指
    //   !heroEquipList[6]||(heroEquipList[6]&&heroEquipList[7])?installPostionIndex=6:installPostionIndex=7
    // }
    if (!!heroEquipList[position]){
      //装备被替换回到装备
      const newEquip=await getEquipDate((heroEquipList[position] as I_Equip).tokenId)

      !!newEquip?myEquipList.push(newEquip):message.error(t('message.serverError'))
    }
    const findindex=myEquipList.findIndex((item)=>{ return item.tokenId===equip.tokenId })
    myEquipList.splice(findindex, 1)
    setMyEquipList([...myEquipList])
    heroEquipList[position]=equip
    // getMykey()
    setHeroEquipList([...heroEquipList])

  }
  //卸下装备
  const downEquip=async (equip:I_Equip, position:number)=>{
    heroEquipList[position]=null
    setHeroEquipList([...heroEquipList])
    const newEquip=await getEquipDate(equip.tokenId)
    if (!!newEquip){
      myEquipList.push(newEquip as I_Equip)
      setMyEquipList([...myEquipList])
    } else {
      getMykey()
    }


    // getMykey()
  }
  //穿戴  卸下装备--校验
  const operationEquip=async ()=>{

    try {
      if (!selectEquip||!hero) return
      // //校验职业
      if (selectEquip.class.indexOf(hero.occupation)<0) return message.info(t('game.backpack.DoNotMeetProfessionalRequirements'))
      if (!(hero.level>=selectEquip.lv)) return message.info(t('game.backpack.GradeRequirementsAreNotMet'))
      //校验是否已经装备
      if (modelbtnType==='on'&&heroEquipList.find((item)=>item?.tokenId===selectEquip.tokenId)) return message.info(t('game.backpack.ThisItemIsEquipped'))
      setIsShowDetail(false)
      setLoading(true)
      const myAddress =await library.getSigner().getAddress()

      const apiSign=await getPutTakeEquipSignApi(myAddress, hero.tokenId, [selectEquip.tokenId])
      const sign=await getSigner(library, apiSign)
      if (!sign){
        return message.error(t('message.privilegeGrantFailed'))
      }

      if (modelbtnType==='on'){
      //安装
        const position= getEquipPostion(selectEquip, true)
        const res=await putOnEquipApi(myAddress, hero.tokenId, selectEquip.tokenId, position, sign)
        if (res){
          await onEquip(selectEquip, position)
          setHeroAttr(res)
        }


      } else if (modelbtnType==='down'){
      //卸下
        const position= getEquipPostion(selectEquip, false)
        const res=await takeOffEquipApi(myAddress, hero.tokenId, [selectEquip.tokenId], [position], sign)
        if (res){

          await downEquip(selectEquip, position)

          setHeroAttr(res)
        }

      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      message.error(t('message.privilegeGrantFailed'))
    }


  }
  //渲染装备
  const renderBox= useMemo(
    () => ()=>{
      const filterList=myEquipList
        .filter((item)=>{
          if (value===0){
            return true

          } else {
            if (value<=6){
              //没到戒指
              return item.equip===value-1

            } else if (value===7){
              //戒指
              return item.equip===6||item.equip===7
            } else {
              //8腰带   9鞋子
              return item.equip===value
            }
          }
        })

      const dataLength =filterList.length
      const rowCount=7
      const initCount=42
      //保持是7的倍数,一行以7个数字为准
      const allCount=dataLength<initCount?initCount:(Math.floor(dataLength/rowCount)+(dataLength%rowCount===0?0:1))*rowCount
      const getInitDom=(equip:I_Equip|null, key:string|number)=>{
        const url= equip?getEquipImg(equip.name):''

        const triggerOpenModal=()=>{
          if (!equip){
            return
          }
          setIsShowDetail(true)
          setSelectEquip(equip)
          setModelbtnType('on')
        }

        return <div className={`p-item rarity${equip?.rarity} `} key={key+'hero_equip'} >
          <div className={`raritySupperCom raritySupper${equip?.rarity}`}
            onClick={(e)=>{
              triggerOpenModal()
              e.stopPropagation()
            }}
          ></div>
          {
            equip&&<>
              {/* 锻造等级 */}
              {equip.castLv>0&& <div className="forgeLv">+{equip.castLv}</div>}
              {equip.coldTime>0&&<ColdTimeDom equip={equip} />}
              <img src={url} alt=""
              // onR={()=>{ triggerOpenModal() }}
              // onDoubleClick={()=>{

                // }}
                onContextMenu={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  triggerOpenModal()
                  return false
                }}
                onClick={()=>{
                  triggerOpenModal()
                }} />

            </>
          }

        </div>
      }
      const domArr:React.ReactNode[]=[]
      filterList.forEach(element => {
        domArr.push(getInitDom(element, element.tokenId))
      })
      //渲染空白行
      const nullCount=allCount>=dataLength?allCount-dataLength:allCount
      for (let index = 0; index < nullCount; index++) {
        domArr.push(getInitDom(null, index))

      }
      return domArr

    },
    [myEquipList, value]
  )
  //渲染英雄装备
  const renderHeroEpuip=(type:'left'|'right')=>{
    const domArr:React.ReactNode[]=[]
    const startIndex=type==='left'?0:1
    for (let i = startIndex; i < heroEquipList.length; i+=2) {
      const element=heroEquipList[i]
      domArr.push(element?
        <div className='heroEquipItems' key={'heroEquipItems'+element.tokenId}>
          {element.castLv>0&& <div className="forgeLv">+{element.castLv}</div>}
          <div className={`raritySupperCom raritySupper${element?.rarity}`}
            onClick={(e)=>{
              setIsShowDetail(true)
              setSelectEquip(element)
              setModelbtnType('down')
              setIsLeftRing(type==='left')
              e.stopPropagation()
            }}
          ></div>
          <EquipImg
            key={element.tokenId}
            isShowDetail={false}
            equip={element}
            {...heroEquipStyles}
            onImgClick={(equipItem)=>{
              setIsShowDetail(true)
              setSelectEquip(equipItem)
              setModelbtnType('down')
              setIsLeftRing(type==='left')
            }}
          />
        </div>:<div key={i} className="eq-item"></div>)
    }
    return domArr
  }
  /**
   * 渲染装备累加属性
   * @param attr 装备属性
   * @returns 装备累加属性
   */
  const renderHeroEqupiAttr=(attr:I_Equip_key)=>{
    return <span className="heroEquipAddStr">  {equipAttr[attr]!==0&&`(+${equipAttr[attr]})`} </span>
  }
  return (
    <Spin spinning={loading}>

      {
        !isShowForge? <BackPackWrapper>


          <div className="hero">
            <div className="title">
              {t('game.heros.hero')}
            </div>
            {/* 选择英雄框 */}
            {isShowChoseHero && (
              <ChoseHero
                setLoading={setLoading}
                setVisible={setIsShowChoseHero}
                onChoseHero={onChoseHero}
              />
            )}
            <div className="chose-hero">
              <div className="btn" onClick={() =>{ setIsShowChoseHero(true) }}>
                <img className="decor" src={roleDecorator} alt="" />
                <span>
                  {t('game.backpack.selectHero')}
                </span>
              </div>
            </div>
            <div className="lv z-50">Lv.{hero?.level} <span className="ml-2">TokenID:{hero?subTokenId(hero?.tokenId, 5):''}</span></div>
            <div className="equipment">
              {/* 左边装备 */}
              <div className="left">
                {
                  renderHeroEpuip('left')
                }
              </div>
              {/* 中间的英雄 */}
              <div className="center ">
                {/* 被选中英雄 */}
                {/* {
                hero&& <AlchemyHero hero={hero} />
              } */}
                <HeroImg
                  boxClassName="relative"
                  boxStyle={{
                    marginTop: -50
                  }}
                  className="self-center  heroImg  scale-75 z-10  md:scale-110"
                  occupation={hero?.occupation}
                  style={{
                    height: !hero?486:'',
                    width: '90%',
                    marginTop: -40
                  }}
                />

                <img className='z-1' src={herodbg} alt="" />
              </div>
              {/* 右边装备 */}
              <div className="right">
                {
                  renderHeroEpuip('right')
                }
              </div>
            </div>
            {/* 英雄属性 */}
            <div className="attr-desc">
              <div className="attr-top">
                <div className="at-item">
                  <img src={attackImg} alt="" />
                  <div className="text">
                    <span>{t('game.backpack.Attack')}</span>
                    <span className="num"><span>{heroAttr.occupation===1?heroAttr.MAG:heroAttr.DMG}</span>{heroAttr.occupation===1?renderHeroEqupiAttr('mag'): renderHeroEqupiAttr('dmg')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={lifeImg} alt="" />
                  <div className="text">
                    <span>{t('game.backpack.HP')}</span>
                    <span className="num">{heroAttr.HP}{renderHeroEqupiAttr('hp')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={guardImg} alt="" />
                  <div className="text">
                    <span>{t('game.backpack.Defense')}</span>
                    <span className="num">{heroAttr.DEF}{renderHeroEqupiAttr('def')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={mageImg} alt="" />
                  <div className="text">
                    <span>{t('game.backpack.Resistance')}</span>
                    <span className="num">{heroAttr.RES}{renderHeroEqupiAttr('res')}</span>
                  </div>
                </div>
              </div>
              <div className="attr-bottom">
                <div className="at-item">
                  <img src={strengthImg} alt="" />
                  <div className="text">
                    <span>{t('game.strength_s')}</span>
                    <span className="num">{heroAttr.strength}{renderHeroEqupiAttr('str')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={mindImg} alt="" />
                  <div className="text">
                    <span>{t('game.mind_s')}</span>
                    <span className="num">{heroAttr.mind}{renderHeroEqupiAttr('spt')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={agilityImg} alt="" />
                  <div className="text">
                    <span>{t('game.agility_s')}</span>
                    <span className="num">{heroAttr.agility}{renderHeroEqupiAttr('agi')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={willImg} alt="" />
                  <div className="text">
                    <span>{t('game.will_s')}</span>
                    <span className="num">{heroAttr.will}{renderHeroEqupiAttr('wil')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={staminaImg} alt="" />
                  <div className="text">
                    <span>{t('game.stamina_s')}</span>
                    <span className="num">{heroAttr.stamina}{renderHeroEqupiAttr('con')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={intelligenceImg} alt="" />
                  <div className="text">
                    <span>{t('game.intelligence_s')}</span>
                    <span className="num">{heroAttr.intelligence}{renderHeroEqupiAttr('inte')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="backpack">
            <div className="bp-title">
              {t('game.backpack.inventory')}
            </div>
            <div className="tabs">
              <MTabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={true}
              >
                {/* 全部0 */}
                <MTab disableRipple label={t('game.backpack.All')} />
                {/* 左手武器 主武器 1*/}
                <MTab disableRipple label={t('game.backpack.Weapon')} />
                {/* <MTab disableRipple label={t('game.backpack.TwoHandedwrapon')} /> */}
                {/* 右手武器 副武器*2 */}
                <MTab disableRipple label={t('game.backpack.OffHand')} />
                {/* 头盔3 */}
                <MTab disableRipple label={t('game.backpack.Helmet')} />
                {/* 项链4 */}
                <MTab disableRipple label={t('game.backpack.Necklace')} />
                {/* 盔甲5 */}
                <MTab disableRipple label={t('game.backpack.Armor')} />
                {/* 手套 6*/}
                <MTab disableRipple label={t('game.backpack.Glove')} />
                {/* 戒指7 */}
                <MTab disableRipple label={t('game.backpack.Ring')} />
                {/* 腰带8 */}
                <MTab disableRipple label={t('game.backpack.Belt')} />
                {/* 鞋子9 */}
                <MTab disableRipple label={t('game.backpack.Boots')} />

              </MTabs>
              <div className="panel">
                {
                  renderBox()
                }
              </div>
            </div>
          </div>
          <div id="modalShowEquip">
            {
              selectEquip&&isShowDetail&& <EquipmentDialog
                tokenId={selectEquip.tokenId}
                id="modalShowEquip"
                equip={selectEquip}
                isShowForge={modelbtnType==='on'}
                btnType={hero?modelbtnType:undefined}
                onBtnClick={(type:string)=>{
                  if (type==='update'){
                    operationEquip()
                  } else {
                    setIsShowForge(true)
                    setIsShowDetail(false)
                  }
                }}
                visible={isShowDetail}
                onCancel={()=>{ setIsShowDetail(false) }} />

            }
          </div>


        </BackPackWrapper>:<BackPackForgeWrapper className='w-full'
        >
          {isShowBackBtn&&<div><Back className='clossBack' backCall={()=>{ setIsShowForge(false) }} /></div>}

          <div> {selectEquip&&<Forge mainEquip={selectEquip} logPageCall={(isOpen)=>{ setIsShowBackBtn(!isOpen) }} />}</div>


        </BackPackForgeWrapper>
      }

    </Spin>
  )
}
interface I_ColdTimeDom{
  equip:I_Equip
}
//背包冷却时间组件
export const ColdTimeDom:React.FC<I_ColdTimeDom>=({equip}:I_ColdTimeDom)=>{
  const [coldTime, setColdTime]=useState(equip.coldTime)

  useEffect(() => {
    countDown(equip.coldTime)

  }, [])
  //倒计时
  const countDown=(time:number)=>{
    if (time>0){
      setTimeout(() => {
        setColdTime(time-1)
        countDown(time-1)
        equip.coldTime= equip.coldTime-1
      }, 1000)
    } else {
      setColdTime(0)
    }

  }
  return coldTime>0? <div className="forgeCdTime">
    {/* <AccessTimeIcon className="icon" /> */}
    {formatTime(coldTime)}</div>:<></>
}
export default Backpack
