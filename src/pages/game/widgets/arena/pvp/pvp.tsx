
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { PVPStyle } from './style'
import attackImg from 'src/assets/images/game/backpack/attack.png'
import guardImg from 'src/assets/images/game/backpack/guard.png'
import hpImg from 'src/assets/images/game/adventure/hpImg.png'

import mageImg from 'src/assets/images/game/backpack/mage.png'
import Checkpoints1Img from 'src/assets/images/game/adventure/Checkpoints/1.png'
import { bigHeroImgList } from 'src/config'
import defaultImg from 'src/assets/images/market/defult-img.png'
import rightTop from 'src/assets/images/game/adventure/rightTop.png'
import leftTop from 'src/assets/images/game/adventure/leftTop.png'
import rightRoundImg from 'src/assets/images/game/adventure/rightRound.png'
import leftRoundImg from 'src/assets/images/game/adventure/leftRound.png'
import attrBoxLine from 'src/assets/images/game/adventure/attrBoxLine.png'

import priorityAttackImg from 'src/assets/images/game/adventure/priorityAttack.png'

import { attributesType, t_attribute } from 'src/utils/attributeSetting'
import {useState, useEffect, useMemo, useRef} from 'react'
import { Spin } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { useSetState } from 'ahooks'
import PveResultDialog from 'src/components/Dialog/PveResultDialog'
import { I_Equip } from '../../backpack/index'
import { equipSpilt, getKeyPackage, groupByArr } from '../../backpack/equipUtils'
import { pocketList } from '../../lottery'
import { PVPBattleRecord, T_pvpHero } from 'src/pages/api/pvp'


interface I_Pvp{
  pvpData:PVPBattleRecord
  backCall:()=>void
}

type t_roundHero={
  name: string,
  hp: number,
  totalHp: number
  occupation: number,
  level: number,
  hero:T_pvpHero
  imgUrl?:string
}
type t_renderInfo={
  tagertA:string,
  targetB:string,
  round: number,
  hurtValue: number,
  attackedPosition: 'left'|'right'|'',
  leftHero:t_roundHero,
  rightHero: t_roundHero,
  gold: number,
  dlt: number,
  info:string,
  type:'attack'|'die'|'onStage',
  equip:I_Equip[],
  priorityAttack:'left'|'right'
}


const PVP = (props:I_Pvp) => {
  const { backCall, pvpData }=props
  const [leftHero, setLeftHero]=useState<T_pvpHero>()
  const [rightHero, setRightHero]=useState<T_pvpHero>()
  const attackAudioRef: any = useRef(null)
  const missAudioRef: any = useRef(null)


  const { t, i18n: {language} } = useTranslation()

  const { library } = useWeb3React()

  const [round, setRound]=useState<t_renderInfo|undefined>(undefined)

  //结果最终收益
  const [allProfit, setAllProfit]=useSetState({
    gold: 0,
    dlt: 0,
    type: 'fail' as 'win'|'fail',
    equipList: [] as I_Equip[],
    visible: false
  })
  const [loading, setLoading] = useState(false)
  useEffect( ()=>{
    initData()

  }, [])


  // }, [round?.dlt, round?.gold])
  const initData=async(isMock=false, isTest=true)=>{
    setLoading(true)
    const myAddress =await library.getSigner().getAddress()

    //设置英雄位置
    const isLeft=pvpData.prepareInfo.hero1.player===myAddress
    const leftHeroData=isLeft?pvpData.prepareInfo.hero1:pvpData.prepareInfo.hero2
    const rightHeroData=isLeft?pvpData.prepareInfo.hero2:pvpData.prepareInfo.hero1
    setLeftHero(leftHeroData)
    setRightHero(rightHeroData)

    renderRoundData(isLeft, leftHeroData, rightHeroData)

  }

  //渲染回合数据
  const renderRoundData=( isLeft:boolean, leftHeroData:T_pvpHero, rightHeroData:T_pvpHero )=>{


    const roundList:t_renderInfo[]=[]

    const {rounds, settles }=pvpData
    //优先攻击标志---第一回合判断

    const priorityAttack:'left'|'right'=(isLeft?rounds[0].hero1.isAttack:rounds[0].hero2.isAttack)?'left':'right'
    rounds.map((roundItem)=>{

      //回合数0
      const roundCount:number=roundItem.round
      //怪物
      const roundLeftHero=isLeft?roundItem.hero1:roundItem.hero2
      const roundRightHero=isLeft?roundItem.hero2:roundItem.hero1


      //伤害  DMG 物理伤害:2,  MAG 魔法伤害:3,HP1
      const hurtValue=roundLeftHero.isAttack?roundLeftHero.Dstrike+roundLeftHero.Mstrike:roundRightHero.Dstrike+roundRightHero.Mstrike
      //英雄血量:4
      const leftHeroHp=roundLeftHero.HP
      //英雄最大血量
      const leftHeroMaxHp=leftHeroData.HP
      //怪物血量:5
      const rightHeroHp=roundRightHero.HP
      const gold=0
      const dlt=0
      const rightHeroMaxHp=rightHeroData.HP
      //左边是否是攻击方
      const isAttack=roundLeftHero.isAttack

      //8 掉落列表
      const renderEquip:I_Equip[]=[]

      //回合数据
      const newRound:t_renderInfo={
        tagertA: isAttack?t(`home.${attributesType[leftHeroData.occupation].name}`):t(`home.${attributesType[rightHeroData.occupation].name}`),
        targetB: !isAttack?t(`home.${attributesType[leftHeroData.occupation].name}`):t(`home.${attributesType[rightHeroData.occupation].name}`),
        round: roundCount,
        hurtValue: hurtValue,
        attackedPosition: !isAttack?'left':'right',
        priorityAttack: priorityAttack,
        equip: renderEquip,
        info: '',
        type: 'attack',
        leftHero: {
          name: t(`home.${attributesType[leftHeroData.occupation].name}`),
          hp: leftHeroHp,
          totalHp: leftHeroMaxHp,
          occupation: leftHeroData.occupation,
          level: leftHeroData.level,
          hero: leftHeroData
        },
        rightHero: {
          name: t(`home.${attributesType[rightHeroData.occupation].name}`),
          hp: rightHeroHp,
          totalHp: rightHeroMaxHp,
          occupation: rightHeroData.occupation,
          level: rightHeroData.level,
          hero: rightHeroData
        },
        gold: gold,
        dlt: dlt
      }
      //对手登场 登场回合
      if (roundList.length===0){
        const firstRound:t_renderInfo = {
          ...newRound,
          info: `${t('game.arena.pvp.battleBegins')}`,
          hurtValue: 0,
          type: 'onStage',
          leftHero: {
            ...newRound.leftHero,
            hp: leftHeroMaxHp
          },
          rightHero: {
            ...newRound.rightHero,
            hp: rightHeroMaxHp
          }
        }

        roundList.push(firstRound)
      }
      roundList.push( newRound)


      //死亡回合
      if (leftHeroHp===0||rightHeroHp===0){
        const lastRound=roundList[roundList.length-1]

        //死亡回合
        const dieRound:t_renderInfo={
          ...lastRound,
          attackedPosition: '',
          info: `${ leftHeroHp===0?lastRound.leftHero.name:lastRound.rightHero.name} ${t('game.adventure.die')}`,
          type: 'die'
        }
        // dieRound.rightHero.hp=0
        roundList.push(dieRound)


      }


      return roundItem

    })

    const isWin=roundList[roundList.length-1].rightHero.hp===0
    const winHeroSettle=isWin?(isLeft?settles.hero1:settles.hero2):(!isLeft?settles.hero1:settles.hero2)
    setAllProfit({
      gold: 0,
      dlt: isWin?winHeroSettle.allDlt:0,
      equipList: winHeroSettle.winEquips,
      type: isWin?'win':'fail'
    })
    setLoading(false)

    setTimeout(()=>{
      initDom(roundList)
    }, 10)

    return roundList

  }

  const initDom=async (roundList:t_renderInfo[])=>{
    //执行动画效果
    const upDateDom=async (dataList:t_renderInfo[], index:number)=>{
      if (index<dataList.length){
        setRound(undefined)
        setRound({...dataList[index]})
        if (dataList[index].type==='attack'){
          if (dataList[index].hurtValue===0){
            if (missAudioRef){
              missAudioRef&&missAudioRef.current&& missAudioRef.current.play()
            }

          } else {
            if (attackAudioRef){
              attackAudioRef&&attackAudioRef.current&&attackAudioRef.current.play()
            }
          }

        }
        setTimeout(() => {
          upDateDom(dataList, index+1)
        }, 1200)
      } else {
        if (!allProfit.visible){
          setTimeout(() => {
            setAllProfit({
              visible: true
            })
          }, 1000)
        }

      }

    }
    upDateDom(roundList, 0)
  }

  //关卡图片
  const CheckpointsImgConfig=[

    {
      url: Checkpoints1Img
    }
  ]

  const renderAttrItem=(attr:string, hero:T_pvpHero ) =>{
    return <div className='attrItem'>
      <span className='attrLable'>
        <img
          style={{
            paddingRight: 7
          }}
          alt=''
          src={require(`src/assets/images/game/adventure/${attr}.png`)} /> {t('game.' + attr)}</span>
      <span className='attrValue'>{hero && hero[attr as t_attribute]}</span>
    </div>

  }
  const attrShow=(hero:T_pvpHero )=>{
    return <div className="attrShow">
      {
        renderAttrItem('strength', hero)
      }
      {
        renderAttrItem('will', hero)
      }
      {
        renderAttrItem('agility', hero)
      }
      {
        renderAttrItem('mind', hero)
      }
      {
        renderAttrItem('stamina', hero)
      }
      {
        renderAttrItem('intelligence', hero)
      }
    </div>

  }
  const renderTextCom= useMemo(
    () => () => {

      return round ? (
        <div className='message-hide'>
          {
            round.type!=='attack'?<div className='messageContent'>
              <p style={{paddingBottom: 5}}>{round?.info}</p>


            </div>
              :<div className='messageContent'>
                <p style={{paddingBottom: 5}}>{round?.tagertA} {t('game.adventure.triedToAttackThe')} {round?.targetB}</p>
                <p>{round?.hurtValue===0?t('game.adventure.miss'):`${t('game.adventure.caused')}${round.hurtValue}${t('game.adventure.damage')}`}</p>

              </div>
          }


        </div>
      ) : (
        <></>
      )
    },
    [round]
  )

  //渲染收益的金币,钥匙,装备
  const renderProfitCom= useMemo(
    () => () => {
      const {keyList, equipList}=equipSpilt(round?.equip??[])
      const groupList=groupByArr(equipList, 'name')

      const initKeyList=getKeyPackage(keyList)
      return <div className="gold">
        <div>{t('game.heros.gold')}:<span style={{marginLeft: 2}}>{round?.gold??0}</span></div>
        <div>DLT:<span style={{marginLeft: 2}}>{round?.dlt??0}</span></div>

        {
          pocketList.map((keyItem, index)=>{
            if (initKeyList[index].length===0) return ''
            return <div key={keyItem.title+index}>
              {t(`game.adventure.${keyItem.title}Key`)}:<span style={{marginLeft: 2}}>{initKeyList[index].length}</span>
            </div>
          })
        }
        <div>
          {
            groupList.map((item:I_Equip[], index)=>{
              return <span className="equipNameItem" key={index+'equipName'}>{language==='en-US'?item[0].en:item[0].name}*{item.length}</span>

            })
          }
        </div>


      </div>
    },
    [round]
  )


  const {keyList, equipList}=equipSpilt(allProfit.equipList??[])
  // function


  return (
    <PVPStyle>
      <div id="test"></div>
      <Spin spinning={loading} tip={t('game.adventure.pveLoadingInfo')}>
        {
          <div className="page" >
            {/* 左上角,右上角 图片 */}
            <img className="topLeftIcon" alt="" src={leftTop} ></img>
            <img className="topRightIcon" alt="" src={rightTop} ></img>
            {/* 左下角,右下角 图片 */}
            <img className="bottomLeftIcon" alt="" src={rightTop} ></img>
            <img className="bottomRightIcon" alt="" src={leftTop } ></img>
            {/* 主要内容部分 */}
            <div className="main"

              style={{
                backgroundImage: `url(${CheckpointsImgConfig[0].url})`
              }}
            >

              {/* 标题 */}
              <div className="pveTitle">{t('game.adventure.battle')}</div>
              {/* 英雄内容部分 */}
              <div className="heroContent"
                style={{
                  visibility: loading?'hidden':'inherit'
                }}
              >
                {/* 中间部分 */}
                <div className="center-common">
                  <div className="vsText">VS</div>
                  {/* 战斗快报 */}
                  <div className="message">
                    <p className="title">{t('game.adventure.battleBulletin')}</p>

                    {
                      renderTextCom()
                    }
                    {/* /* 先手显示图片 */}
                    { round&&<img className={`priorityAttack_${round?.priorityAttack}`} alt='' src={priorityAttackImg} />}

                  </div>

                  {/* 收益金币 */}
                  {renderProfitCom()}

                </div>
                {leftHero&& <HeroBox position="left" roundHero={round?.leftHero} hero={leftHero} roundInfo={round}/>}
                {rightHero&& <HeroBox position="right" roundHero={round?.rightHero} hero={rightHero} roundInfo={round} />}


              </div>
              {/* 回合数 */}
              <div className="roundBox absolute bottom-0 left-0"
                style={{
                  visibility: loading?'hidden':'inherit'
                }}
              >
                <span
                  style={{
                    left: 30
                  }}
                >1</span>
                <img alt="" src={leftRoundImg} ></img>
              </div>
              <div className="roundBox absolute bottom-0 right-0">
                <span
                  style={{
                    right: 30
                  }}
                >{round?.round}</span>
                <img alt="" src={rightRoundImg} ></img></div>

            </div>
            {/* 属性部分 */}
            <div className="attrBox"
              style={{
                visibility: loading?'hidden':'inherit'
              }}
            >
              {
                leftHero&&attrShow(leftHero)
              }
              {
                rightHero&&attrShow(rightHero)
              }
              {/* 分割线图片 */}
              <img className='attrBoxLine' alt='' src={attrBoxLine} ></img>
            </div>
          </div>
        }

      </Spin>
      {/* 打斗音乐播放器 */}

      <audio ref={attackAudioRef} className='attackedAudio' controls src={`${process.env.PUBLIC_URL}/voice/attacked.mp3`}>
      </audio>
      {/* miss音乐播放器 */}
      <audio ref={missAudioRef} className='attackedAudio' controls src={`${process.env.PUBLIC_URL}/voice/miss.wav`}>
      </audio>
      {/* 结果弹窗 */}
      <PveResultDialog
        onOk={()=>{ setAllProfit({visible: false});backCall() }}
        visible={allProfit.visible}
        type={allProfit.type}
        dlt={allProfit.dlt}
        gold={allProfit.gold}
        isShowLose={allProfit.type==='fail'}
        keyList={getKeyPackage(keyList)}
        equipList={equipList}
        modelType={'pvp'}
      />

    </PVPStyle>
  )
}


interface I_HeroBox{
  position:'left'|'right',
  roundHero?:t_roundHero,
  hero:T_pvpHero
  roundInfo?:t_renderInfo
}
/**
 * 英雄组件
 * @param props
 * @returns
 */
const HeroBox = (props: I_HeroBox) => {
  const { position = 'left', hero, roundInfo, roundHero } = props

  //获取英雄图片
  const getHeroImg=()=>{


    return bigHeroImgList[hero.occupation]
  }

  //攻击
  //   {
  //     '敏捷': agility,
  //     '智力':intelligence,
  //     '精神': mind,
  //     '体质 ': stamina,
  //     '力量': strength,
  //     '意志': will
  //   }
  //攻击
  const get_DMG_attr:string=(hero.DMG+hero.MAG)+''
  //护甲
  const get_DEF_attr:string=hero.DEF+''
  //魔抗
  const get_RES_attr:string=hero.RES+''
  //攻击防御属性样式
  const renderHero_sp_attr=(imgUrl:string, label:string, value:string|number) => {
    const attrClassName = position === 'left' ? 'mr-6' : 'ml-6'
    return <span className={`${attrClassName} sp_attr`}>
      <img className="mr-1" alt="" src={imgUrl} />{' '}
      <span>
        <span className="mr-2">{label}</span>
        <span className="font-bold">{value}</span>
      </span>
    </span>
  }
  const getHeroAnimation=():string =>{
    if (!!roundInfo){
      if (roundInfo.type==='attack'){
        //攻击动画
        return roundInfo.attackedPosition!==position?`heroImgHurt_${position as string} 0.5s 1 linear `:''
      } else if (roundInfo.type==='die'&&roundHero?.hp===0){
        //死亡动画
        return `heroImgDie_${position as string} 1s 1 linear `
      }

    }
    return ''

  }

  return (
    <div className="heroItem">
      {/* 英雄血量信息 */}
      <div
        className={'infoRow flex flex-nowrap '}
        style={{
          flexDirection: position === 'right' ? 'row-reverse' : 'row',
          padding: position === 'right' ? '0 25px 0 0' : '0 0px 0 25px '
        }}
      >
        {/* 英雄头像 */}
        <div
          className={`heroHeadImg ${'heroHeadImg-'+position}`}
        >
          <div className='heroHeadImgborderbox'>
            <img
              alt=""
              src={require(`src/assets/images/game/adventure/${hero.occupation}.png`)}
            ></img>
          </div>
        </div>

        {/* 其它基础信息 */}
        <div
          className="hpInfoRow"
          style={{
            color: '#fff'
          }}
        >
          {/* 名称等级 */}
          <div
            style={{
              textAlign: position,
              color: '#D68C3F'
            }}
          >
            <span>{roundHero?.name??''}</span>
            <span className="ml-2">LV{hero.level}</span>
          </div>
          {/* 血量 */}
          <div
            className="heroHpBg"

          >
            {/* 血量显示 */}
            <div className='hpText' >{roundHero&&(roundHero.hp.toFixed(0))}</div>
            <div
              className="heroHpValue"
              style={{
                width: (roundHero? roundHero.hp/roundHero.totalHp*100:100 )+ '%',
                transition: 'width .3s linear',
                background: `url(${hpImg}) no-repeat`,
                backgroundSize: 'cover',
                borderRadius: `10px ${roundHero&&(roundHero.hp/roundHero.totalHp*100)===100?'10px 10px':'0px 0px'} 10px`
              }}
            ></div>
          </div>
          {/* 属性 */}
          <div
            className="flex items-center "
            style={{
              color: '#B2856C',
              justifyContent: position === 'right' ? 'end' : 'start'
            }}
          >
            {/* 攻击 */}
            {renderHero_sp_attr(attackImg, t('game.adventure.Attack'), get_DMG_attr)}
            {/* 护甲 */}
            {renderHero_sp_attr(guardImg, t('game.adventure.Defense'), get_DEF_attr)}
            {/* 魔抗 */}
            {renderHero_sp_attr(mageImg, t('game.adventure.Resistance'), get_RES_attr)}
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center relative overflow-hidden">
        {/* 伤害显示 */}
        {
          position === roundInfo?.attackedPosition&&<div className={`hurtShowTextBox hurtShowTextBox-${position}`}>
            {
              roundInfo.type!=='onStage'&&<span className="hurtShowText">
                {roundInfo&&roundInfo?.hurtValue===0?'Miss':`-${roundInfo?.hurtValue}`}
              </span>
            }

          </div>
        }
        {/* <div className={`hurtShowTextBox hurtShowTextBox-${position}`}>
          <span className="hurtShowText">
                111
          </span>

        </div> */}
        {/* 英雄图片 */}
        <img
          style={{
            animation: getHeroAnimation()
            // animationFillMode: roundInfo?.type==='die'? 'forwards':'none'
          }}
          className={`self-center  heroImg  scale-75 md:scale-110 ${'heroImg-'+position} heroType_${roundInfo?.type}`}
          src={!!hero?getHeroImg():defaultImg}
          alt=""
        />
      </div>
    </div>
  )
}
export default PVP

