import { message, notification, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { myHerosNew } from 'src/web3/hero'
import { useTranslation } from 'react-i18next'
import { MineWrapper } from './style'
import Button from 'src/components/Button'
import { useWeb3React } from '@web3-react/core'
import useMountedRef, { copyToClipboard, subTokenId } from 'src/utils'
import { HeroImgList } from 'src/config'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import ptSenior from 'src/assets/images/game/mine/pt_senior.png'
import ptGlodImg from 'src/assets/images/game/mine/pt_glod.png'
import minePhoneDecor from 'src/assets/images/game/mine/mine_phone_decor.png'
import { EquType, useWindowSize } from 'src/context'
import { useNavigate } from 'react-router-dom'
import { HeroType, HeroAttrList, Occupations } from 'src/types/hero'
import { MineMapType, WorkName } from 'src/types/mine'
import { mineMap } from 'src/config/mine'
import { getJobTokenIds } from 'src/web3/job'
import { useSafeState, useSetState } from 'ahooks'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import { isDisabledConfig } from 'src/config/switch'

const Mine: React.FC = () => {


  const { library, account } = useWeb3React()
  const { t, i18n } = useTranslation()
  const [pageLoading, setPageLoading] = useSetState({
    heroLoading: false,
    mapLoading: false
  })
  const [heroList, setHeroList] = useState<HeroType[]>([])
  const [mapList, setMapList] = useSafeState<MineMapType[]>(mineMap)
  const { windowSize } = useWindowSize()
  const mountedRef = useMountedRef()
  const navigate = useNavigate()

  const getHero = useCallback(async () => {
    setPageLoading({ heroLoading: true })
    try {
      const heros = await myHerosNew(library)
      if (mountedRef.current) {
        setHeroList(heros.reverse())
      }
    } catch (error) {
      notification.error({
        message: 'myHeros Error',
        description: (error as Error).message
      })
    } finally {
      setPageLoading({ heroLoading: false })
    }

  }, [library, mountedRef])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (account) {
      getHero()
    }
    return () => {
      setHeroList([])
    }
  }, [account, getHero])

  const getWorkList = useCallback(async () => {
    if (account === undefined) return
    setPageLoading({mapLoading: true})
    try {
      for (const item of mineMap) {
        const tokenIds = await getJobTokenIds(library, item.mapId)
        item.workHeroSize = tokenIds.length
      }
      setMapList(mineMap)
    } catch (e: any) {
      notification.error({
        message: 'getJobTokenIds Error',
        description: e.message || 'error'
      })
    } finally {
      setPageLoading({mapLoading: false})
    }
  }, [account])

  useEffect(() => {
    getWorkList()
  }, [getWorkList])

  const handleMine = (name: WorkName) => {
    if (isDisabledConfig){
      return

    }
    if (
      name === WorkName.slmg ||
      name === WorkName.wrgc ||
      name === WorkName.tzzd
    ) {
      return message.info(t('game.ComingSoon'))
    }
    navigate(`/game/mine/${name}`)
  }

  function renderDetailAttr(item: MineMapType) {
    // 骑士
    if (item.occupation === Occupations['warrior']) {
      return <>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['stamina']}`)}
          </div>
          <div className="limit-number">{item.stamina}</div>
        </div>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['strength']}`)}
          </div>
          <div className="limit-number">{item.strength}</div>
        </div>

      </>
    }
    if (item.occupation === Occupations['mage']) {
      return <>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['intelligence']}`)}
          </div>
          <div className="limit-number">{item.intelligence}</div>
        </div>
        <div className="row-limit">
          <div className="limit-text">{t(`game.${HeroAttrList['mind']}`)}</div>
          <div className="limit-number">{item.mind}</div>
        </div>
      </>
    }
    if (item.occupation === Occupations['hunter']) {
      return <>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['strength']}`)}
          </div>
          <div className="limit-number">{item.strength}</div>
        </div>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['agility']}`)}
          </div>
          <div className="limit-number">{item.agility}</div>
        </div>
      </>
    }
    if (item.occupation === Occupations['assassin']) {
      return <>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['agility']}`)}
          </div>
          <div className="limit-number">{item.agility}</div>
        </div>
        <div className="row-limit">
          <div className="limit-text">
            {t(`game.${HeroAttrList['strength']}`)}
          </div>
          <div className="limit-number">{item.strength}</div>
        </div>
      </>
    }
  }

  return (
    <Spin spinning={ pageLoading.mapLoading }>
      <MineWrapper>
        {windowSize === EquType.PHONE && <div className="hero-num">
          <img src={minePhoneDecor} alt="" />
          <span>
            {t('game.mine.myHero')}:
            <span className="num">{heroList.length}</span>
          </span>
        </div>}
        <div className="my-hero">
          <div className="title">
            {t('game.mine.myHero')}:{heroList.length}
          </div>
          <div className="hero-list">
            <Spin spinning={pageLoading.heroLoading}>
              {
                heroList.map(item => (
                  <div key={item.tokenId} className="item">
                    <div className="img">
                      <img
                        style={{ width: '50px' }}
                        src={HeroImgList[item.occupation]}
                        alt=""
                      />
                    </div>
                    <div className="desc">
                      <div className="t-title">
                        <span>{t(`home.${Occupations[item.occupation]}`)}</span>
                        <span className="lv">LV.{item.level}</span>
                      </div>
                      <div className="tokenid">
                        <span>Token ID：{subTokenId(item.tokenId)}</span>
                        <CopyIcon
                          width="16"
                          height="16"
                          fill="#664F42"
                          style={{ marginLeft: '4px', cursor: 'pointer' }}
                          onClick={() => copyToClipboard(item.tokenId)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </Spin>
          </div>
        </div>
        <div className="mine-map">
          {
            mapList.map(item => (
              <div key={item.name} className="mine-item">
                <p className="m-title">{t(`game.mine.${item.name}`)}</p>
                <div className="img">
                  <img src={item.img} alt="" />
                </div>
                <div className="reward-block py-0 px-9 md:px-7">
                  <span className="ml-3 mt-1 text-thirdly">
                    { t('game.mine.working') }: {item.workHeroSize}
                  </span>
                  <span>
                    {
                      item.reward.map(
                        (item, index) => <img key={index} src={item} alt="" />
                      )
                    }
                  </span>
                </div>
                <div className="limit">
                  <div className="limit-tit">
                    <img src={item.delineation} alt="" />
                    <span>
                      {i18n.language === 'zh-CN' ? item.cnLimit : item.enLimit}
                    </span>
                  </div>
                  {
                    item.occupation !== undefined ?
                      <div className="no-row">
                        <div className="row-limit">
                          <div className="limit-text">
                            {t('game.mine.level')}
                          </div>
                          <div className="limit-number">{item.level}</div>
                        </div>
                        {
                          renderDetailAttr(item)
                        }
                      </div>
                      : <div className="no-row">
                        <img
                          src={item.name === WorkName.parttime ? ptGlodImg : ptSenior}
                          alt=""
                          style={{ width: '50px', margin: '0 auto' }}
                        />
                      </div>
                  }

                </div>
                <Button
                  width="186px"
                  height="46px"
                  bold
                  fontSize="16px"
                  disabled={isDisabledConfig}
                  img={item.state === 'started' ? btnRedBg : btnDarkBg}
                  onClick={() => handleMine(item.name)}
                >
                  {t('game.mine.ready')}
                </Button>
              </div>
            ))
          }
        </div>
      </MineWrapper>
    </Spin>
  )
}

export default Mine
