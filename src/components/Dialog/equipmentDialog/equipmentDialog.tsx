
import hurt1Img from 'src/assets/images/game/backpack/hurt1.png'
import magImg from 'src/assets/images/game/backpack/mag.png'
import dmgImg from 'src/assets/images/game/backpack/dmg.png'

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
import { EquipmentModalStyle } from './style'
import closeImg from 'src/assets/images/common/close2.png'
import Button from 'src/components/Button'
// import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import Star from 'src/components/Star/star'
import { initEquip, I_Equip } from 'src/pages/game/widgets/backpack'
import { attributesType } from 'src/utils/attributeSetting'
import EquipImg from 'src/components/EquipImg/equipImg'
import { getInfosApi } from 'src/pages/api/equip'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'


interface I_EquipmentDialog{
  id?:string
  tokenId?:string
  equip?:I_Equip
  onBtnClick?:(type:string)=>void
  visible:boolean
  onCancel:()=>void
  btnType?:string
  isShowForge?:boolean
}
export const attrList=[
  //力量
  'str',
  //敏捷
  'agi',
  //体质
  'con',
  //意志
  'wil',
  //智力
  'inte',
  //精神
  'spt',
  //物攻
  'dmg',
  //法攻
  'mag',
  //生命
  'hp',
  //物防
  'def',
  //法防
  'res'
]
const EquipmentDialog =(props:I_EquipmentDialog)=>{
  let timer: NodeJS.Timeout
  const {id='body', onBtnClick, btnType, isShowForge, visible, tokenId}=props
  const [equip, setEquip]=useState(initEquip)
  const [coldTime, setColdTime]=useState(1)
  const [loading, setLoading]=useState(false)
  const { t, i18n: {language}} = useTranslation()

  const clearTimer=()=>{
    // clearTimeout(timer)
    clearInterval(timer)
  }
  useEffect(() =>{
    return ()=>{
      if (timer){
        clearTimer()
      }
    }
  })
  useEffect(() => {
    if (visible){

      if (timer){
        clearTimer()
      }

      if (tokenId){
        getEquipDate()
      } else if (props?.equip){
        setEquip(props.equip)
        props.equip.coldTime!==0? countDown(props.equip.coldTime):setColdTime(0)
      }
    } else {
      if (timer){
        clearTimer()
      }
    }


  }, [visible])


  // 倒计时
  // const countDown=(time:number)=>{
  //   if (time>0){
  //     timer=setTimeout(() => {
  //       setColdTime(time-1)
  //       countDown(time-1)
  //       equip.coldTime= equip.coldTime-1
  //     }, 1000)
  //   } else {
  //     clearTimer()
  //     setColdTime(0)
  //   }
  //   return

  // }
  const countDown=(time:number)=>{
    timer= setInterval(() => {
      if (time>0){
        timer=setTimeout(() => {
          setColdTime(time-1)
          // countDown(time-1)
          time=time-1
          equip.coldTime= equip.coldTime-1
        }, 1000)
      } else {
        clearTimer()
        setColdTime(0)
      }

    }, 1000)


  }


  const getClassNameByAttr=(attr:string, type='text')=>{
    if (type==='text'){
      return equip.canForgeAttrs&&equip.canForgeAttrs.indexOf(attr)>=0?'addColor':''
    } else {

      const addValue=equip.casts&&equip.casts[attrList.indexOf(attr)]
      return addValue>0?'addColor':''
    }


  }
  const getEquipDate=async()=>{
    if (tokenId){
      setLoading(true)
      const res=await getInfosApi([tokenId])
      if (res&&res[0]){
        setEquip(res[0])
        res[0].coldTime!==0?countDown(res[0].coldTime): setColdTime(0)

      }
      setLoading(false)

    }


  }

  if (!equip||!visible) return <></>
  return (
    <Spin spinning={loading}>
      <EquipmentModalStyle
        width={600}

        title={null}
        centered
        maskClosable={false}
        destroyOnClose
        closable={false}
        footer={null}
        getContainer={() => document.getElementById(id) || document.body}
        {...props}
      >
        <div className="info">
          <div className="leftInfo">
            {/* 装备图片 */}
            {/* <img alt="" className='img' src={getEquipImg(equip.name)} /> */}
            <EquipImg equip={equip} className='img' isShowDetail={false} />
            {/* 按钮 */}
            {
              onBtnClick&& <div className='btnRow'>
                {/* 已装备的装备不能锻造升级 */}
                {
                  isShowForge&&<Button
                    width="140px"
                    height="42px"
                    fontSize="18px"
                    bold
                    img={btnRedBg}
                    onClick={()=>{ onBtnClick('forge') }}
                    className="btn"
                  >
                    { t('game.backpack.Forge')}
                  </Button>
                }


                {btnType&&
            <Button
              width="140px"
              height="42px"
              fontSize="18px"
              disabled={coldTime>0}
              bold
              loading={loading}
              img={btnRedBg}
              onClick={()=>{ if (coldTime>0) return; onBtnClick('update') }}
              className="btn"
            >
              {
                btnType==='on'? t('game.backpack.Equipment'):btnType==='down'?t('game.backpack.Disassemble'):''
              }

            </Button>
                }
              </div>
            }

          </div>
          <div className="rightInfo">
            <div className="titleRow">
              {/* 装备名称 */}
              <span className="name">{language==='en-US'?equip.en:equip.name} <span className="subName">({equip.castLv}/{equip.forge})</span></span>
              {/* 星级 */}
              <Star count={equip.rarity} className="starBox" />
              {/* 关闭图标 */}
              <img
                className="w-6 h-6 cursor-pointer closeIcon"
                src={closeImg}
                alt=""
                onClick={props.onCancel}
              />
            </div>
            <div className="infoRow">
              <div className="infoRowItem">
                <div className="label">{t('game.backpack.RoleRequiRements')}</div>
                <div>
                  {
                    equip.class.map((item, index)=>{
                      return <span key={index} className="classItem">
                        { item>=0&&item<=3? t(`home.${attributesType[item].name}`):'-'}
                      </span>
                    })
                  }
                </div>
              </div>
              <div className="infoRowItem">
                <div className="label">{t('game.backpack.AttributeRequirements')}</div>
                <div>-</div>
              </div>
            </div>
            <div className="infoRow">
              <div className="infoRowItem">
                <div className="label">{t('game.backpack.GradeRequirements')}</div>
                <div>LV.{equip.lv}</div>
              </div>
              <div className="infoRowItem">
                <div className="label">{t('game.backpack.Weight')}</div>
                <div>0KG</div>
              </div>
            </div>
            {/* 属性信息 */}
            <div className="attrRow">
              <div className="attr-top">
                <div className="at-item">
                  <img src={hurt1Img} alt="" />
                  <div className="text">
                    <span >{t('game.backpack.InjuryMultiple')}</span>
                    <span className="num" >{equip.dbrk+equip.rbrk===0?0:((equip.dbrk+equip.rbrk)+'%')}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={dmgImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('dmg')}`}>{t('game.backpack.PhysicalAttack')}</span>
                    <span className={`num ${getClassNameByAttr('dmg', 'number')}`}>{equip.dmg}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={magImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('mag')}`}>{t('game.backpack.MagicAttack')}</span>
                    <span className={`num ${getClassNameByAttr('mag', 'number')}`}>{equip.mag}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={guardImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('def')}`}>{t('game.backpack.Defense')}</span>
                    <span className={`num ${getClassNameByAttr('def', 'number')}`}>{equip.def}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={mageImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('res')}`}>{t('game.backpack.Resistance')}</span>
                    <span className={`num  ${getClassNameByAttr('res', 'number')}`}>{equip.res}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={lifeImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('hp')}`}>{t('game.backpack.HP')}</span>
                    <span className={`num ${getClassNameByAttr('hp', 'number')}`}>{equip.hp}</span>
                  </div>
                </div>

              </div>

              <div className="attr-bottom">
                <div className="at-item">
                  <img src={strengthImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('str')}`}>{t('game.strength_s')}</span>
                    <span className={`num ${getClassNameByAttr('str', 'number')}`}>{equip.str}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={mindImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('spt')}`}>{t('game.mind_s')}</span>
                    <span className={`num ${getClassNameByAttr('spt', 'number')}`}>{equip.spt}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={agilityImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('agi')}`}>{t('game.agility_s')}</span>
                    <span className={`num ${getClassNameByAttr('agi', 'number')}`}>{equip.agi}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={willImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('wil')}`}>{t('game.will_s')}</span>
                    <span className={`num ${getClassNameByAttr('wil', 'number')}`}>{equip.wil}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={staminaImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('con')}`}>{t('game.stamina_s')}</span>
                    <span className={`num ${getClassNameByAttr('con', 'number')}`}>{equip.con}</span>
                  </div>
                </div>
                <div className="at-item">
                  <img src={intelligenceImg} alt="" />
                  <div className="text">
                    <span className={`${getClassNameByAttr('inte')}`}>{t('game.intelligence_s')}</span>
                    <span className={`num ${getClassNameByAttr('inte', 'number')}`}>{equip.inte}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </EquipmentModalStyle>
    </Spin>


  )
}
export default EquipmentDialog
