import { useTranslation } from 'react-i18next'
import Button from 'src/components/Button'
import { getQualityPic, HeroImgList } from 'src/config'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import { copyToClipboard, subTokenId } from 'src/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pve_heroType, Occupations } from 'src/types/hero'
import RenderSpecTitle from './renderSpecTitle'
import classnames from 'classnames'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import { getAttrLevel } from 'src/utils/attributeSetting'

const MobileHeroList: React.FC<{ heroList: pve_heroType[] }> = ({ heroList }) => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const goDetail = (tokenId: string) => {
    navigate(`/game/hero/${tokenId}`)
  }

  const goMine = () => {
    navigate('/game?name=mine')
  }

  return (
    <div className="m-list">
      {
        heroList.map(item => (
          <div key={item.tokenId} className="m-list-item" onClick={() => goDetail(item.tokenId)}>
            <div className="top">
              <div className="img relative">
                <img src={HeroImgList[item.occupation]} draggable="false" alt="" />
                { item.newbie && <NoviceImgMark top={-12} right={-24} height={28} /> }
              </div>
              <div className="desc">
                <span className="title flex items-center">
                  <p>{t(`home.${Occupations[item.occupation]}`)}</p>
                  <p className="mx-3">LV.{item.level}</p>
                  <img src={ getQualityPic(item.total)?.[1] } alt="" />
                </span>
                <div className="flex items-center">
                  <p className="text-sm">{t('game.FatigueValue')}</p>
                  <p className="text-valueColor ml-3">{item.fatigue}</p>
                </div>
                <p>
                  TokenID：{subTokenId(item.tokenId)}
                  <CopyIcon
                    width="16"
                    height="16"
                    fill="#664F42"
                    style={{ marginLeft: '4px', cursor: 'pointer' }}
                    onClick={(e) => copyToClipboard(item.tokenId, e)}
                  />
                </p>
              </div>
            </div>
            <div className="middle">
              <div className="m-item">
                <p className="key">{t('game.total')}</p>
                <p className="value">{item.total}</p>
              </div>
              <div className="m-item">
                <p className="key">{t('game.work')}</p>
                <p className="value">-</p>
              </div>
              <div className="m-item">
                <p className="key">
                  {t('game.heros.remainingChance')}
                </p>
                <p className="value">{item.pveCount}</p>
              </div>
            </div>
            <div className="bottom">
              <div className="attr">
                <div className="attr-item">
                  <p className="key">
                    <RenderSpecTitle
                      type="strength"
                      hero={item}
                    >
                      {t('game.strength')}
                    </RenderSpecTitle>
                  </p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('strength', item)
                    })
                  }>{item.strength}</p>
                </div>
                <div className="attr-item">
                  <p className="key">
                    <RenderSpecTitle
                      type="agility"
                      hero={item}
                    >
                      {t('game.agility')}
                    </RenderSpecTitle></p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('agility', item)
                    })
                  }>{item.agility}</p>
                </div>
                <div className="attr-item">
                  <p className="key">
                    <RenderSpecTitle
                      type="stamina"
                      hero={item}
                    >
                      {t('game.stamina')}
                    </RenderSpecTitle>
                  </p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('stamina', item)
                    })
                  }>{item.stamina}</p>
                </div>
                <div className="attr-item">
                  <p className="key">{t('game.will')}</p>
                  <p className="value">{item.will}</p>
                </div>
                <div className="attr-item">
                  <p className="key">
                    <RenderSpecTitle
                      type="intelligence"
                      hero={item}
                    >
                      {t('game.intelligence')}
                    </RenderSpecTitle>
                  </p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('intelligence', item)
                    })
                  }>{item.intelligence}</p>
                </div>
                <div className="attr-item">
                  <p className="key">
                    <RenderSpecTitle
                      type="mind"
                      hero={item}
                    >
                      {t('game.mind')}
                    </RenderSpecTitle>
                  </p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('mind', item)
                    })
                  }>{item.mind}</p>
                </div>
              </div>
              <div className="btns">
                <Button
                  width="127px"
                  height="40px"
                  bold
                  img={btnRedBg}
                  fontSize="14px"
                  onClick={(e) => {
                    navigate('/game?name=adventure&view=list')
                    e.stopPropagation()
                  }}
                >
                  {t('game.nav.Adventure')}
                </Button>
                <Button
                  img={btnDarkBg}
                  width="127px"
                  height="40px"
                  bold
                  fontSize="14px"
                  onClick={(e) => {
                    e.stopPropagation()
                    goMine()
                  }}
                >
                  {t('game.heros.goToWork')}
                </Button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default MobileHeroList
