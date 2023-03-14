/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { PVEStyle } from './style'
import attackImg from 'src/assets/images/game/backpack/attack.png'
import guardImg from 'src/assets/images/game/backpack/guard.png'
import hpImg from 'src/assets/images/game/adventure/hpImg.png'
// import lifeImg from 'src/assets/images/game/backpack/life.png'
import mageImg from 'src/assets/images/game/backpack/mage.png'
import Checkpoints1Img from 'src/assets/images/game/adventure/Checkpoints/1.png'
import { bigHeroImgList } from 'src/config'
import defaultImg from 'src/assets/images/market/defult-img.png'
import rightTop from 'src/assets/images/game/adventure/rightTop.png'
import leftTop from 'src/assets/images/game/adventure/leftTop.png'
import rightRoundImg from 'src/assets/images/game/adventure/rightRound.png'
import leftRoundImg from 'src/assets/images/game/adventure/leftRound.png'
import attrBoxLine from 'src/assets/images/game/adventure/attrBoxLine.png'
import bossImg from 'src/assets/images/game/adventure/bossTag.png'
import bossMoneyImg from 'src/assets/images/game/adventure/bossMoneyTag.png'
import priorityAttackImg from 'src/assets/images/game/adventure/priorityAttack.png'
import { HeroType } from 'src/types/hero'
import { attributesType, t_attribute } from 'src/utils/attributeSetting'
import {useState, useEffect, useMemo, useRef} from 'react'
import { getMonsterData, imgMap, I_monsterConfigData } from './monstersConfig'
import { message, notification, Spin } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { newBattle, newBattleV1Abi} from 'src/web3/pve'
import { useSetState } from 'ahooks'
import PveResultDialog from 'src/components/Dialog/PveResultDialog'
import { getBattleInfoApi } from 'src/pages/api/request'
import Confirm from 'src/components/Confirm/Confirm'
import { I_Equip, I_HeroEquip } from '../../../backpack/index'
import { pocketList } from '../../../lottery'
import { equipSpilt, getKeyPackage, groupByArr } from '../../../backpack/equipUtils'
import { queryHeroEquipApi } from 'src/pages/api/backpack'

//advId-关卡id
interface I_Pve{
  selectHero?:HeroType
  advId:number
  selectLevel:number
  backCall:()=>void
  isOldHero:boolean
}
type I_pveHeroType={
  name?:string,
  id:number,
  agility:number,
  intelligence:number,
  mind:number,
  stamina:number,
  strength:number,
  will:number,
  occupation:number,
  level:number,
  totalHp:number,
  imgUrl?:string,
  isBoss?:boolean,
  bossIcon?:string
}
type t_roundHero={
  name: string,
  hp: number,
  totalHp: number
  occupation: number,
  level: number,
  hero:I_pveHeroType
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
const PVE = (props:I_Pve) => {
  const {selectHero, advId, selectLevel, backCall, isOldHero }=props
  const attackAudioRef: any = useRef(null)
  const missAudioRef: any = useRef(null)
  const [heroAttr, setHeroAttr]=useState<I_HeroEquip>(initHeroAttr)
  //获取英雄血量
  const getTotalHp=(hero: HeroType|I_pveHeroType)=>{
    return 5*hero.stamina*(1+0.2*(hero.level-1))
  }

  const playerHero:I_pveHeroType={
    totalHp: heroAttr.HP,
    id: 0,
    occupation: selectHero? selectHero.occupation:0,
    level: heroAttr.level,
    strength: heroAttr.strength,
    agility: heroAttr.agility,
    stamina: heroAttr.stamina,
    will: heroAttr.will,
    intelligence: heroAttr.intelligence,
    mind: heroAttr.mind
  }


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
  const [conformVisible, setConformVisible] = useState(false)
  const [abiBattleId, setAbiBattleId]=useState(0)
  useEffect( ()=>{
    const isGetEquip=false
    if (isGetEquip){
      adminStartpve(10)
      return

    }

    initData()
  }, [])

  const adminStartpve=async (count:number)=>{

    for (let i=0;i<count;i++){
      await initData()
    }
  }

  // }, [round?.dlt, round?.gold])
  const initData=async(isMock=false, isTest=false)=>{
    setLoading(true)
    if (selectHero?.tokenId){
      //获取英雄属性信息
      const heroAttrRes= await getHeroEquipList()
      if (isTest){
        const roundList:t_renderInfo[]=Array.from(imgMap, (item)=>{
          const testObj:t_renderInfo={
            'tagertA': '骑士',
            'targetB': '食人花（刺）',
            'round': 2,
            'hurtValue': 179,
            'attackedPosition': 'right',
            'info': '食人花（刺）出现',
            'priorityAttack': 'left',
            'type': 'onStage',
            'equip': [],
            'leftHero':

            {
              'name': '骑士',
              'hp': 325,
              'totalHp': 440,
              'occupation': 0,
              'level': 1,
              'hero':
                {
                  'totalHp': 440, 'id': 0, 'occupation': 0,
                  'level': 1,
                  'strength': 88,
                  'agility': 43,
                  'stamina': 88,
                  'will': 58,
                  'intelligence': 40, 'mind': 49
                }
            },
            'rightHero':
                 {
                   'name': '食人花（刺）',
                   'hp': 150,
                   'totalHp': 150,
                   'occupation': 3,
                   'level': 1,
                   'hero': {
                     'id': 1,
                     'name': '食人花（刺）',
                     'occupation': 3,
                     'level': 1,
                     'strength': 40,
                     'agility': 40,
                     'stamina': 30,
                     'will': 30,
                     'intelligence': 5,
                     'mind': 40,
                     'totalHp': 999
                   }
                 },
            'gold': 622,
            'dlt': 14
          }


          testObj.targetB=item.name
          testObj.info=item.name+'出现'
          testObj.rightHero.name=item.name
          testObj.rightHero.hero.name=item.name
          return testObj
        })
        setLoading(false)
        initDom(roundList)

        return
      }
      if (isMock){

        const {prepareInfo, rounds, settle}= await getBattleData(38)
        renderRoundData(prepareInfo, rounds, settle)
        return
      }
      try {
        const res=isOldHero?await newBattleV1Abi(library, advId, selectLevel, selectHero.tokenId): await newBattle(library, advId, selectLevel, selectHero.tokenId)

        //怪物列表

        if (res.events) {
          for (const event of res.events) {

            if (event.event === 'StartBattle'){
              const battleId=event?.args?.battleId.toNumber()
              const {prepareInfo, rounds, settle, error}= await getBattleData(battleId )
              if (error){
                setAbiBattleId(battleId)
                setConformVisible(true)
                return
              }
              renderRoundData(prepareInfo, rounds, settle, heroAttrRes)


            }
          }
        }


      } catch (error) {
        setLoading(false)
        notification.error({
          message: 'Error',
          description: (error as Error).message,
          duration: 2
        })
      }

    }

  }

  const getHeroEquipList=async()=>{
    if (!selectHero) return


    // setHeroEquipList([])
    const res=await queryHeroEquipApi(selectHero.tokenId)
    if (res){
      setHeroAttr(res)
      return res
    }

  }
  //获取对战数据
  const getBattleData=async(battleId:number)=>{
    // const myAddress =await library.getSigner().getAddress()
    if (!selectHero?.tokenId){
      return null
    }
    // selectHero?.tokenId, myAddress
    const apiRes= await getBattleInfoApi(battleId)
    return apiRes
  }
  //渲染回合数据
  const renderRoundData=(prepareInfo:any, rounds:(number|boolean)[][], settle:{allDlt:number, allGold:number, win:boolean, winEquips:I_Equip[] }, heroAttrRes=heroAttr)=>{
    if (!prepareInfo||!rounds||!settle){
      message.error(t('game.adventure.FailedToGetData'))
      setLoading(false)
      return []

    }
    const monsterHeroList:I_pveHeroType[]=Array.from(prepareInfo.monsters, (item:I_pveHeroType)=>{
      const monsterData=getMonsterData(item.name as string)
      item.name=language==='en-US'? (monsterData as I_monsterConfigData)?.name??'':item.name

      //是否是boss

      item.isBoss= (monsterData as I_monsterConfigData)?.isBoss??false
      item.bossIcon= (monsterData as I_monsterConfigData)?.isBoss?(monsterData as I_monsterConfigData).bossIcon:''

      return item
    })
    const roundList:t_renderInfo[]=[]

    rounds.map((roundItem:(number|boolean|string[])[], index:number)=>{

      //回合数0
      const roundCount:number=roundItem[0] as number
      //怪物
      const monster=monsterHeroList[roundCount-1]
      //回合数
      const isAttack=roundItem[1] as boolean
      //伤害  DMG 物理伤害:2,  MAG 魔法伤害:3,HP1
      const hurtValue=(roundItem[2] as number)+ (roundItem[3] as number)
      //英雄血量:4
      const heroHp=roundItem[4] as number
      //英雄最大血量
      const heroMaxHp=prepareInfo.hero.hp??heroAttrRes.HP
      //怪物血量:5
      const monsterHp=roundItem[5] as number
      const gold=roundItem[6] as number
      const dlt=roundItem[7] as number
      const monsterTotalHp=getTotalHp( monster)
      //优先攻击标志---第一回合判断
      let priorityAttack:'left'|'right'=isAttack?'left':'right'
      //8 掉落列表
      const renderEquip:I_Equip[]=[]
      settle.winEquips.forEach((item)=>{
        if ((roundItem[8] as string[]).indexOf(item.tokenId)>=0){
          renderEquip.push(item)
        }
        // (roundItem[8] as string[]).indexOf(item.tokenId)>=0?renderEquip.push(item):null
      })
      //日志中怪物名称
      const getLogName=(name:string| undefined)=>{
        if (name){
          return language==='en-US'?name?.split('(')[0].split('（')[0]:name
        }
        return ''

      }
      //回合数据
      const newRound:t_renderInfo={
        tagertA: isAttack?t(`home.${attributesType[playerHero.occupation].name}`):getLogName(monster.name)??('game.adventure.appear'),
        targetB: !isAttack?t(`home.${attributesType[playerHero.occupation].name}`):getLogName(monster.name)??('game.adventure.appear'),
        round: roundCount,
        hurtValue: hurtValue,
        attackedPosition: !isAttack?'left':'right',
        priorityAttack: priorityAttack,
        equip: renderEquip,
        info: '',
        type: 'attack',
        leftHero: {
          name: t(`home.${attributesType[playerHero.occupation].name}`),
          hp: heroHp,
          totalHp: heroMaxHp,
          occupation: playerHero.occupation,
          level: playerHero.level,
          hero: playerHero
        },
        rightHero: {
          name: monster?.name??'',
          hp: monsterHp,
          totalHp: monsterTotalHp,
          occupation: monster.occupation,
          level: monster.level,
          hero: monster
        },
        gold: gold,
        dlt: dlt
      }
      //第一回合,怪物登场,让怪物图片预先加载出来
      if (roundList.length===0){
        const firstRound:t_renderInfo = {
          ...newRound,
          info: `${getLogName(monster.name)??''}${t('game.adventure.appear')}`,
          type: 'onStage'

        }
        firstRound.rightHero.hp=monsterTotalHp

        roundList.push(firstRound)
      }


      //判断怪物是否死亡,增加怪物死亡回合和怪物登场回合
      //不是第一回合并且回合更改
      if (roundCount!==1&&roundCount!==roundList[roundList.length-1].round){
        const lastRound=roundList[roundList.length-1]
        priorityAttack=isAttack?'left':'right'
        //死亡回合
        const dieRound:t_renderInfo={
          ...lastRound,
          attackedPosition: '',
          info: `${ getLogName(lastRound.rightHero.name)} ${t('game.adventure.die')}`,
          type: 'die'
        }
        dieRound.rightHero.hp=0
        roundList.push(dieRound)
        //登场回合
        roundList.push( {
          tagertA: isAttack?t(`home.${attributesType[playerHero.occupation].name}`): getLogName(monster?.name)??t('game.adventure.appear'),
          targetB: !isAttack?t(`home.${attributesType[playerHero.occupation].name}`):getLogName(monster?.name)??('game.adventure.appear'),
          round: roundCount,
          hurtValue: hurtValue,
          attackedPosition: !isAttack?'left':'right',
          info: `${getLogName(monster?.name)??''}${t('game.adventure.appear')}`,
          priorityAttack: priorityAttack,
          equip: lastRound.equip,
          type: 'onStage',
          leftHero: {
            name: t(`home.${attributesType[playerHero.occupation].name}`),
            hp: lastRound.leftHero.hp,
            totalHp: heroMaxHp,
            occupation: playerHero.occupation,
            level: playerHero.level,
            hero: playerHero
          },
          rightHero: {
            name: monster?.name??'',
            hp: monsterTotalHp,
            totalHp: monsterTotalHp,
            occupation: monster.occupation,
            level: monster.level,
            hero: monster,
            imgUrl: monster.imgUrl
          },
          gold: gold,
          dlt: dlt
        }
        )

      } else {

        if (roundList.length!==0){
          const lastRound=roundList[roundList.length-1]
          priorityAttack=lastRound.priorityAttack
        }
      }
      newRound.priorityAttack=priorityAttack
      roundList.push( newRound)
      return roundItem

    })
    setAllProfit({
      gold: settle.allGold??0,
      dlt: settle.allDlt??0,
      equipList: settle.winEquips,
      type: settle.win?'win':'fail'
    })
    setLoading(false)
    initDom(roundList)
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

  const renderAttrItem=(attr:string, hero:I_pveHeroType) =>{
    return <div className='attrItem'>
      <span className='attrLable'><img
        style={{
          paddingRight: 7
        }}
        alt=''
        src={require(`src/assets/images/game/adventure/${attr}.png`)}></img> {t('game.' + attr)}</span>
      <span className='attrValue'>{hero && hero[attr as t_attribute]}</span>
    </div>

  }
  const attrShow=(hero:I_pveHeroType)=>{
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

  const renderBossImg=()=>{
    if (!round?.rightHero.hero.isBoss){
      return <></>

    } else if (round?.rightHero.hero.bossIcon==='boss'){
      return <img className='BossImg' alt='' src={bossImg}/>
    } else if (round?.rightHero.hero.bossIcon==='bossMoney'){
      return <img className='BossImg  bossMoney' alt='' src={bossMoneyImg} />
    } else {
      return <></>
    }


  }


  const {keyList, equipList}=equipSpilt(allProfit.equipList??[])

  return (
    <PVEStyle>
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
                    {/* Boss图标 */}
                    {renderBossImg()}
                    {
                      renderTextCom()
                    }
                    {/* /* 先手显示图片 */}
                    { round&&<img className={`priorityAttack_${round?.priorityAttack}`} alt='' src={priorityAttackImg} />}

                  </div>

                  {/* 收益金币 */}
                  {renderProfitCom()}

                </div>
                <HeroBox position="left" roundHero={round?.leftHero} hero={playerHero} roundInfo={round} heroAttr={heroAttr} />
                <HeroBox position="right" roundHero={round?.rightHero} hero={round?.rightHero.hero} roundInfo={round} heroAttr={heroAttr} />

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
                playerHero&&attrShow(playerHero)
              }
              {
                round?.rightHero.hero&&attrShow(round?.rightHero.hero)
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
        keyList={getKeyPackage(keyList)}
        equipList={equipList}
      />
      {/* 网络错误重试弹窗 */}
      <Confirm visible={conformVisible}
        onCancel={() =>{
          setConformVisible(false)
          backCall()
        }}
        onOk={async ()=>{
          setLoading(true)
          const {prepareInfo, rounds, settle, error}= await getBattleData(abiBattleId)
          if (error){
            message.error(t('message.serverError'))
            return
          }
          setConformVisible(false)
          renderRoundData(prepareInfo, rounds, settle)
          setLoading(false)
        }} />
    </PVEStyle>
  )
}


interface I_HeroBox{
  position:'left'|'right',

  roundHero?:t_roundHero,
  hero?:I_pveHeroType
  roundInfo?:t_renderInfo
  heroAttr:I_HeroEquip
}
/**
 * 英雄组件
 * @param props
 * @returns
 */
const HeroBox = (props: I_HeroBox) => {
  const { position = 'left', hero =
  { occupation: 0, agility: 0, strength: 0, will: 0, intelligence: 0, mind: 0, stamina: 0, level: 1, totalHp: 100 },
  roundHero, roundInfo, heroAttr} = props

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
  const get_DMG_attr:string=position==='left'?heroAttr.DMG+heroAttr.MAG+'' :(hero.occupation===1?hero.intelligence*(1+(0.2*(hero.level-1))):hero.strength*(1+(0.2*(hero.level-1)))).toFixed(0)
  //护甲
  const get_DEF_attr:string=position==='left'?heroAttr.DEF+'' :(hero.will*(1+(0.2*(hero.level-1)))).toFixed(0)
  //魔抗
  const get_RES_attr:string=position==='left'?heroAttr.RES+'':(hero.mind*(1+(0.2*(hero.level-1)))).toFixed(0)
  const monsterData =roundInfo?.rightHero.hero.name&&getMonsterData(roundInfo.rightHero.hero.name)

  //怪物图片
  const monsterImg= (monsterData as I_monsterConfigData)?.img??''
  //怪物头像
  const monsterHeadImg= (monsterData as I_monsterConfigData)?.headImg??''


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
      } else if (roundInfo.type==='die'){
        //死亡动画
        return 'right'===position?`heroImgDie_${position as string} 1s 1 linear `:''
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
              src={position==='left'? require(`src/assets/images/game/adventure/${hero.occupation}.png`):monsterHeadImg}
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
          src={position==='left'?(!!hero?getHeroImg():defaultImg):(monsterImg )}
          alt=""
        />
      </div>
    </div>
  )
}
export default PVE

