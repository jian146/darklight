import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { getQualityPic, HeroImgList } from 'src/config'
import { copyToClipboard, subTokenId } from 'src/utils'
import { ReactComponent as CopyIcon } from 'src/assets/images/game/hero/copy.svg'
import Button from 'src/components/Button'
import { pve_heroType, Occupations } from 'src/types/hero'
import classnames from 'classnames'
import RenderSpecTitle from './renderSpecTitle'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import { getAttrLevel, getIsQualifiedHero } from 'src/utils/attributeSetting'
import heroQualifiedImg from 'src/assets/images/game/hero/Hero-bg-qu.png'

const HeroList: React.FC<{ heroList: pve_heroType[] }> = ({ heroList }) => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const goDetail = (tokenId: string) => {
    navigate(`/game/hero/${tokenId}`)
  }

  const goMine = () => {
    navigate('/game?name=mine')
  }
  const goPve=() => {
    navigate('/game?name=adventure&view=list')
  }


  return (<div className="list">
    {
      heroList.map(item => {
        const isQualifiedHero=getIsQualifiedHero(item)
        return (
          <div
            className="list-item"
            key={item.tokenId}
            onClick={() => goDetail(item.tokenId)}
          >
            <div className="left">
              <div className="img relative"

                style={{
                  backgroundImage: isQualifiedHero?`url(${heroQualifiedImg})`:''
                }}
              >
                <img
                  src={HeroImgList[item.occupation]}
                  draggable="false"
                  alt=""
                />
                {
                  item.newbie && <NoviceImgMark top={-12} right={-24} height={32} />
                }
              </div>
              <div className="desc">
                <span className="title flex items-center">
                  <p>{t(`home.${Occupations[item.occupation]}`)}</p>
                  <p className='mx-2 text-base'>LV.{item.level}</p>
                  <img src={ getQualityPic(item.total)?.[1] } alt="" />
                </span>
                <span className='flex'>
                  <span>{t('game.FatigueValue')}</span>
                  <span className='text-valueColor ml-2'>{item.fatigue}</span>
                </span>
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
            <div className="divider" />
            <div className="center">
              <div className="attr-item">
                <div className="top">
                  <p className="key">{t('game.total')}</p>
                  <p className="value">{item.total}</p>
                </div>
                <div className="bottom">
                  <p className="key">{t('game.work')}</p>
                  <p className="value">-</p>
                </div>
              </div>
              <div className="attr-item">
                <div className="top">
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
                <div className="bottom">
                  <p className="key">{t('game.will')}</p>
                  <p className="value">{item.will}</p>
                </div>
              </div>
              <div className="attr-item">
                <div className="top">
                  <p className="key">
                    <RenderSpecTitle
                      type="agility"
                      hero={item}

                    >
                      {t('game.agility')}
                    </RenderSpecTitle>
                  </p>
                  <p className={
                    classnames('value', {
                      'primary': getAttrLevel('agility', item)
                    })
                  }>{item.agility}</p>
                </div>
                <div className="bottom">
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
              </div>
              <div className="attr-item">
                <div className="top">
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
                <div className="bottom">
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
            </div>
            <div className="divider" />
            <div className="right">
              <div className="adventure flex flex-col justify-between">
                <div>
                  <p className="key">
                    {t('game.heros.remainingChance')}
                  </p>
                  <p className="value">{item.pveCount}</p>
                </div>
                <div>
                  <p className="key cursor-pointer">
                    {t('game.heros.checkDetails')}
                  </p>
                </div>
              </div>
              <div className="btns">
                <Button
                  width="192px"
                  height="48px"
                  bold
                  img={btnRedBg}
                  className="btn"
                  onClick={(e) => {
                    goPve()
                    e.stopPropagation()
                  }}
                >
                  {t('game.nav.Adventure')}
                </Button>
                <Button
                  width="192px"
                  height="48px"
                  bold
                  img={btnDarkBg}
                  className="btn"
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
        )
      })
    }
  </div>
  )
}

export default HeroList
