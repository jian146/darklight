import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import {
  getHeroByTokenId,
  heroDowngradeLv,
  heroTransfer,
  heroUpgradeLv
} from 'src/web3/hero'
import { notification, Spin, Progress, message } from 'antd'
import { subTokenId } from 'src/utils'
import { useTranslation } from 'react-i18next'
import { HeroDetailWrapper } from './style'
import Button from 'src/components/Button'
import strengthImg from 'src/assets/images/game/hero/strength.png'
import agilityImg from 'src/assets/images/game/hero/agility.png'
import staminaImg from 'src/assets/images/game/hero/stamina.png'
import willImg from 'src/assets/images/game/hero/will.png'
import intelligenceImg from 'src/assets/images/game/hero/intelligence.png'
import mindImg from 'src/assets/images/game/hero/mind.png'
import roleDecorator from 'src/assets/images/game/hero/role_decorator.png'
import herodbg from 'src/assets/images/game/backpack/hero_d_bg.png'
import { getQualityPic } from 'src/config'
import Back from 'src/components/Back'
import { HeroType, Occupations } from 'src/types/hero'
import {
  ResultDialog,
  HeroDialog,
  TransferDialog
} from 'src/components/Dialog'
import Loading from 'src/components/Loading'
import { BigNumber } from 'ethers'
import { useSetState } from 'ahooks'
import { ResultDialogProps } from 'src/components/Dialog/ResultDialog'
import { HeroDialogProps } from 'src/components/Dialog/HeroDialog'
import RenderSpecTitle from '../widgets/heros/renderSpecTitle'
import classnames from 'classnames'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'

import { getAttrLevel } from 'src/utils/attributeSetting'
import HeroImg from 'src/components/Hero/HeroImg'
import { I_Equip_position } from '../widgets/backpack'
import { getPutTakeEquipSignApi, queryHeroEquipApi, takeOffEquipApi } from 'src/pages/api/backpack'
import Confirm from 'src/components/Confirm/Confirm'
import { getSigner } from 'src/web3/equip'

const HeroDetail: React.FC = () => {
  // 获取地址栏的 heroId
  const { id: heroId } = useParams()
  const { account, library } = useWeb3React()
  const { t } = useTranslation()
  // 英雄
  const [hero, setHero] = useSetState<Partial<HeroType>>({})
  const [heroEquipList, setHeroEquipList]=useState<I_Equip_position[]>([])
  const [isShowCon, setIsShowCon]=useState(false)
  // 页面的加载状态
  const [loading, setLoading] = useSetState<{
    globalLoading: boolean;
    pageLoading: boolean;
  }>({
    globalLoading: false,
    pageLoading: false
  })
  // 结果窗口配置
  const [resModalConfg, setResModalConfg] = useSetState<{
    type: ResultDialogProps['type'];
    content: ResultDialogProps['content'];
    visible: boolean;
  }>({
    type: 'success',
    content: '',
    visible: false
  })
  // 升/降级窗口配置
  const [heroModalConfig, setHeroModalConfig] = useSetState<{
    type: HeroDialogProps['type'];
    content: HeroDialogProps['content'];
    visible: boolean;
  }>({
    type: 'upgrade',
    content: '',
    visible: false
  })
  // 转移窗口配置
  const [transferModalConfig, setTransferodalConfig] = useSetState<{
    id: string;
    visible: boolean;
  }>({
    id: '',
    visible: false
  })


  const navigate = useNavigate()

  const back = () => {
    navigate(-1)
  }

  /**
   * @description 根据id获取英雄
   */
  const getHero = useCallback(() => {
    if (account && heroId) {
      setLoading({ pageLoading: true })
      getHeroEquipList()
      getHeroByTokenId(library, heroId)
        .then((res) => {
          setHero(res)

        })
        .catch((err) => {
          notification.error({
            message: 'Error',
            description: err.message
          })
        })
        .finally(() => {
          setLoading({ pageLoading: false })
        })
    }
  }, [account, heroId, library])

  const getHeroEquipList=async()=>{
    if (!heroId) return
    // setHeroEquipList([])
    const res=await queryHeroEquipApi(heroId)
    if (res){
      setHeroEquipList(res.equips)

    }

  }

  useEffect(() => {
    getHero()
    return () => {
      setHero({})
    }
  }, [getHero])

  /**
   * @description 英雄升级
   */
  const handleUpgradeLv = (isUseSafe:boolean) => {
    if (hero.tokenId) {
      setLoading({ globalLoading: true })
      heroUpgradeLv(library, hero.tokenId, isUseSafe)
        .then((res) => {
          if (res.events) {
            for (const event of res.events) {
              if (event.event === 'UpgradeResult') {
                if (!event.args) return
                if (
                  Object.prototype.toString.call(event.args) ===
                  '[object Array]'
                ) {
                  // 隐藏升级窗口
                  setHeroModalConfig({ visible: false })
                  const beforeLv: BigNumber = event.args[1]
                  const afterLv: BigNumber = event.args[2]
                  // 升级前的等级大于等于升级后的等级，升级失败
                  if (beforeLv.gte(afterLv)) {
                    setResModalConfg({
                      type: 'fail',
                      content: t('game.heros.updateFailText'),
                      visible: true
                    })
                  } else {
                    setResModalConfg({
                      type: 'success',
                      content: t('game.heros.updateSuccessText'),
                      visible: true
                    })
                  }
                  // 再次查询当前英雄属性
                  getHero()
                }
              }
            }
          }
        })
        .catch((e) => notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
        )
        .finally(() => {
          setLoading({ globalLoading: false })
        })
    }
  }

  /**
   * @description 英雄降级
   */
  const handleDowngradeLv = () => {
    if (hero.tokenId) {
      setLoading({ globalLoading: true })
      heroDowngradeLv(library, hero.tokenId)
        .then((res) => {
          if (res.events) {
            for (const event of res.events) {
              if (event.event === 'DowngradeResult') {
                if (!event.args) return
                if (
                  Object.prototype.toString.call(event.args) ===
                  '[object Array]'
                ) {
                  // 隐藏降级窗口
                  setHeroModalConfig({ visible: false })
                  // 配置降级成功窗口
                  setResModalConfg({
                    type: 'success',
                    content: t('game.heros.downgradeFailText'),
                    visible: true
                  })
                  // 再次查询当前英雄属性
                  getHero()
                }
              }
            }
          }
        })
        .catch((e) => notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
        )
        .finally(() => {
          setLoading({ globalLoading: false })
        })
    }
  }

  /**
   * @description 显示升/降级窗口
   * @param type 类型
   */
  const showRoleModal = (type: HeroDialogProps['type']) => {
    setHeroModalConfig({
      type,
      content:
        type === 'upgrade'
          ? t('game.heros.updateTips')
          : t('game.heros.failTips'),
      visible: true
    })
  }
  /**
   * @description 显示转移弹窗
   */
  const showTransferModal = () => {
    setTransferodalConfig({
      id: '',
      visible: true
    })
  }

  /**
   * @description 处理
   */
  const handleHeroDialogOk = (isUseSafe:boolean) => {
    if (heroModalConfig.type === 'upgrade') {
      handleUpgradeLv(isUseSafe)
    } else {
      handleDowngradeLv()
    }
  }

  /**
   * 一键卸载装备
   * @returns
   */
  const putEquip=async(heroEquipList:I_Equip_position[])=>{
    if (account && heroId) {
      const myAddress =await library.getSigner().getAddress()
      const positionList:number[]=[], tokenIdList:string[]=[]
      heroEquipList.forEach((item)=>{
        positionList.push(item.position)
        tokenIdList.push(item.equip.tokenId)
      })
      const apiSign=await getPutTakeEquipSignApi(myAddress, heroId, tokenIdList)
      const sign=await getSigner(library, apiSign)
      if (!sign){
        return message.error(t('message.privilegeGrantFailed'))
      }
      const res=await takeOffEquipApi(myAddress, heroId, tokenIdList, positionList, sign)
      if (res){
        handleTransferDialogOk()

      }
      setIsShowCon(false)
    }


  }
  /**
   * @description 转移
   */
  const handleTransferDialogOk = () => {


    if (transferModalConfig.id.trim()===''){
      setResModalConfg({
        type: 'fail',
        content: t('message.required'),
        visible: true
      })
      return

    }
    if (hero.tokenId) {
      setLoading({ globalLoading: true })
      heroTransfer(library, hero.tokenId, transferModalConfig.id)
        .then((res) => {
          if (res.events) {
            for (const event of res.events) {
              if (event.event === 'Transfer') {
                if (!event.args) return
                if (
                  Object.prototype.toString.call(event.args) ===
                  '[object Array]'
                ) {
                  // 隐藏降级窗口
                  setTransferodalConfig({ visible: false, id: '' })
                  // 配置降级成功窗口
                  setResModalConfg({
                    type: 'success',
                    content: t('game.heros.transferText'),
                    visible: true
                  })
                  back()
                  // 再次查询当前英雄属性
                  getHero()
                }
              }
            }
          }
        })
        .catch((e) => notification.error({
          message: 'error',
          description: e?.data?.message || 'error'
        })
        )
        .finally(() => {
          setLoading({ globalLoading: false })
        })
    }
  }
  return (
    <HeroDetailWrapper>
      <Back />
      <Loading spinning={loading.globalLoading} fixed center zIndex={10000} />
      {/* 角色升/降级窗口 */}
      <HeroDialog
        type={heroModalConfig.type}
        hero={hero}
        content={heroModalConfig.content}
        onCancel={() => setHeroModalConfig({ visible: false })}
        visible={heroModalConfig.visible}
        onOk={(isUseSafe:boolean) => handleHeroDialogOk(isUseSafe)}
      />
      {/* 转移窗口 */}
      <TransferDialog
        onCancel={() => setTransferodalConfig({ visible: false })}
        visible={transferModalConfig.visible}
        id={transferModalConfig.id}
        idOnChange={(value: string) =>{
          transferModalConfig.id=value
          setTransferodalConfig({...transferModalConfig})
        }}
        onOk={() =>{
          if (heroEquipList.length>0){
            setIsShowCon(true)
            return
          }
          handleTransferDialogOk()
        }}
      />
      {/* 操作结果窗口 */}
      <ResultDialog
        visible={resModalConfg.visible}
        type={resModalConfg.type}
        content={resModalConfg.content}
        onCancel={() => setResModalConfg({ visible: false })}
      />
      {/* 询问弹窗 */}
      <Confirm visible={isShowCon} title="Info" okText={t('confirm')} onOk={()=>{ putEquip(heroEquipList) }} onCancel={()=>{ setIsShowCon(false) }} >
        <div className="initMessage text-center">{t('game.heros.transferEquipMessage')}</div>
      </Confirm>
      <Spin spinning={loading.pageLoading}>
        <div className="hero-info">
          <div className="attribute">
            <div className="title">{t('game.heros.heroAttributes')}</div>
            <div className="top-desc">
              <div className="left">
                <p className="name">
                  {hero.occupation !== undefined
                    ? t(`home.${Occupations[hero.occupation]}`)
                    : ''}
                </p>
                <p className="level mx-4">LV.{hero.level}</p>
                {hero.total && <img src={ getQualityPic(hero.total)?.[1] } alt="" />}
              </div>
              <div className="btn md:mt-2">
                <Button
                  width="136px"
                  height="40px"
                  fontSize="16px"
                  bold
                  disabled={hero.level === 12}
                  img={btnRedBg}
                  className="mb-2"
                  onClick={() => showRoleModal('upgrade')}
                >
                  {t('game.heros.upgrade')}
                </Button>
                {/* 暂时取消降级功能 */}
                {/* <Button
                  width="136px"
                  height="40px"
                  fontSize="16px"
                  bold
                  disabled={1 === 1}
                  img={1=== 1 ? btnDarkBg : btnRedBg}
                  className="mb-2"
                  onClick={() => showRoleModal('downgrade')}
                >
                  {t('game.heros.downgrade')}
                </Button> */}
                <Button
                  width="136px"
                  height="40px"
                  fontSize="16px"
                  img={btnRedBg}
                  bold
                  className="mb-3"
                  onClick={() => showTransferModal()}
                >
                  {t('game.heros.transfer')}
                </Button>
              </div>
            </div>
            <div className="bottom-attr">
              <div className="title-box">
                <span className="title">{t('game.heros.attributes')}</span>
                <span className="total">
                  {t('game.total')}:{hero.total}
                </span>
              </div>
              <div className="attr-list">
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={strengthImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="strength"
                        hero={hero as HeroType}
                      >
                        {t('game.strength')}
                      </RenderSpecTitle>
                    </div>
                    <div
                      className={classnames('i-val', {
                        primary:
                           getAttrLevel('strength', hero as HeroType)
                      })}
                    >
                      {hero.strength}
                    </div>
                  </div>
                  <Progress percent={hero.strength} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={agilityImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="agility"
                        hero={hero as HeroType}
                      >
                        {t('game.agility')}
                      </RenderSpecTitle>
                    </div>
                    <div
                      className={classnames('i-val', {
                        primary: getAttrLevel('agility', hero as HeroType)
                      })}
                    >
                      {hero.agility}
                    </div>
                  </div>
                  <Progress percent={hero.agility} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={staminaImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="stamina"
                        hero={hero as HeroType}
                      >
                        {t('game.stamina')}
                      </RenderSpecTitle>
                    </div>
                    <div
                      className={classnames('i-val', {
                        primary: getAttrLevel('stamina', hero as HeroType)
                      })}
                    >
                      {hero.stamina}
                    </div>
                  </div>
                  <Progress percent={hero.stamina} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={willImg} draggable="false" alt="" />
                      <span>{t('game.will')}</span>
                    </div>
                    <div className="i-val">{hero.will}</div>
                  </div>
                  <Progress percent={hero.will} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={intelligenceImg} draggable="false" alt="" />
                      <RenderSpecTitle
                        type="intelligence"
                        hero={hero as HeroType}
                      >
                        {t('game.intelligence')}
                      </RenderSpecTitle>
                    </div>
                    <div
                      className={classnames('i-val', {
                        primary: getAttrLevel('intelligence', hero as HeroType)
                      })}
                    >
                      {hero.intelligence}
                    </div>
                  </div>
                  <Progress percent={hero.intelligence} showInfo={false} />
                </div>
                <div className="attr-item">
                  <div className="info">
                    <div className="i-title">
                      <img src={mindImg} draggable="false" alt="" />
                      <RenderSpecTitle type="mind" hero={hero as HeroType}>
                        {t('game.mind')}
                      </RenderSpecTitle>
                    </div>
                    <div
                      className={classnames('i-val', {
                        primary: getAttrLevel('mind', hero as HeroType)
                      })}
                    >
                      {hero.mind}
                    </div>
                  </div>
                  <Progress percent={hero.mind} showInfo={false} />
                </div>
              </div>
            </div>
            <div className="prod">
              <p>{t('game.heros.basicDescription')}</p>
              <p>{t(`home.${Occupations[hero.occupation || 0]}Desc`)}</p>
            </div>
          </div>
          <div className="hero">
            <div className="title">{t('game.heros.hero')}</div>
            <div className="hero-name">
              <img src={roleDecorator} alt="" />
              {t(`home.${Occupations[hero.occupation || 0]}`)}
            </div>
            <div className="h-box relative">
              <p className="token">
                NFT TokenID：{subTokenId(hero.tokenId || '')}
              </p>
              <img src={herodbg} className="bg" alt="" />
              <HeroImg occupation={hero.occupation} />

              {hero.newbie && (
                <NoviceImgMark
                  className="mark"
                  top={40}
                  right={40}
                  height={35}
                />
              )}
            </div>
          </div>
        </div>
      </Spin>
    </HeroDetailWrapper>
  )
}

export default HeroDetail
