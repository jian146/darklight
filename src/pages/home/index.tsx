import React from 'react'
import { useTranslation } from 'react-i18next'
import { EquType, useWindowSize } from 'src/context'
import { HomeWrapper } from './style'
import bannerBg from 'src/assets/images/index/banner_bg.png'
import top from 'src/assets/images/index/top.png'
import mtop from 'src/assets/images/mhome/top.png'
import titleBg from 'src/assets/images/index/title_bg.png'
import advImg from 'src/assets/images/index/adv.png'
import ntfImg from 'src/assets/images/index/nft.png'
import skillImg from 'src/assets/images/index/skill.png'
import goldImg from 'src/assets/images/index/gold.png'
import warrior from 'src/assets/images/index/warrior.png'
import mage from 'src/assets/images/index/mage.png'
import hunter from 'src/assets/images/index/hunter.png'
import assassin from 'src/assets/images/index/assassin.png'
import proAct from 'src/assets/images/index/pro_active.png'
import pro from 'src/assets/images/index/pro.png'
import p1 from 'src/assets/images/index/1.png'
import en1 from 'src/assets/images/index/en1.png'
import p2 from 'src/assets/images/index/2.png'
import en2 from 'src/assets/images/index/en2.png'
import p3 from 'src/assets/images/index/3.png'
import en3 from 'src/assets/images/index/en3.png'
import p4 from 'src/assets/images/index/4.png'
import en4 from 'src/assets/images/index/en4.png'
import p5 from 'src/assets/images/index/5.png'
import en5 from 'src/assets/images/index/en5.png'
import orgDraw from 'src/assets/images/index/org_draw.jpg'
import mBanner from 'src/assets/images/mhome/mbanner.png'
import mm1 from 'src/assets/images/mhome/mm1.png'
import mm2 from 'src/assets/images/mhome/mm2.png'
import mm3 from 'src/assets/images/mhome/mm3.png'
import mm4 from 'src/assets/images/mhome/mm4.png'
import mm5 from 'src/assets/images/mhome/mm5.png'
import mm6 from 'src/assets/images/mhome/mm6.png'
import Footer from 'src/layout/Footer'
import Button from 'src/components/Button'
import btnBg from 'src/assets/images/common/btn_red.png'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {

  const { t, i18n: { language } } = useTranslation()
  const { windowSize } = useWindowSize()
  const navigate = useNavigate()

  const startGame = () => {
    navigate('/game')
  }

  return (
    <HomeWrapper className={windowSize === EquType.PHONE ? 'm' : ''}>
      <div className="banner">
        <img
          className="banner-top"
          src={windowSize === EquType.PHONE ? mtop : top}
          alt=""
        />
        <img
          className="banner-bg md:object-cover md:h-banner"
          src={windowSize === EquType.PHONE ? mBanner : bannerBg}
          alt=""
        />
        <Button
          className="absolute bottom-4 -translate-y-1/2  md:bottom-32 left-1/2
                    transform -translate-x-1/2 startBtn"
          fontSize="18px"
          img={btnBg}
          width="186px"
          height="46px"
          onClick={startGame}
        >{t('home.startGame')}</Button>
      </div>
      <div className="play-intro">
        <div className="p-title">
          <img src={titleBg} alt="" />
          <span>{t('home.HTPlay')}</span>
        </div>
        <div className="pi-wrapper">
          <div className="item">
            <div className="img">
              <img src={advImg} alt="" />
            </div>
            <div className="desc">
              <div className="title">{t('home.AdvMode')}</div>
              <div className="sub-title">{t('home.Hlohcwhp')}</div>
            </div>
          </div>
          <div className="item">
            <div className="img">
              <img src={ntfImg} alt="" />
            </div>
            <div className="desc">
              <div className="title">{t('home.ntfah')}</div>
              <div className="sub-title">{t('home.Free2Trade')}</div>
            </div>
          </div>
          <div className="item">
            <div className="img">
              <img src={skillImg} alt="" />
            </div>
            <div className="desc">
              <div className="title">{t('home.GsSystem')}</div>
              <div className="sub-title">{t('home.Rfha')}</div>
            </div>
          </div>
          <div className="item">
            <div className="img">
              <img src={goldImg} alt="" />
            </div>
            <div className="desc">
              <div className="title">{t('home.dtesystem')}</div>
              <div className="sub-title">{t('home.BothtcbMined')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="occupation-intro">
        <div className="p-title">
          <img src={titleBg} alt="" />
          <span>{t('home.HeroIntroduction')}</span>
        </div>
        <div className="hero-item">
          <div className="h-text">
            <div className="title">{t('home.warrior')}</div>
            <div className="content">{t('home.warriorDesc')}</div>
          </div>
          <div className="divider"></div>
          <div className="h-img">
            <img src={warrior} alt="" />
          </div>
        </div>
        <div className="hero-item">
          <div className="h-text">
            <div className="title">{t('home.mage')}</div>
            <div className="content">{t('home.mageDesc')}</div>
          </div>
          <div className="divider"></div>
          <div className="h-img">
            <img src={mage} alt="" />
          </div>
        </div>
        <div className="hero-item">
          <div className="h-text">
            <div className="title">{t('home.hunter')}</div>
            <div className="content">{t('home.hunterDesc')}</div>
          </div>
          <div className="divider"></div>
          <div className="h-img">
            <img src={hunter} alt="" />
          </div>
        </div>
        <div className="hero-item">
          <div className="h-text">
            <div className="title">{t('home.assassin')}</div>
            <div className="content">{t('home.assassinDesc')}</div>
          </div>
          <div className="divider"></div>
          <div className="h-img">
            <img src={assassin} alt="" />
          </div>
        </div>
      </div>

      <div className="path">
        <div className="p-title">
          <img src={titleBg} alt="" />
          <span>{t('home.Roadmap')}</span>
        </div>
        <div className="path-container">
          <div className="item">
            {language === 'zh-CN' && <img className="exp" src={p1} alt="" />}
            {language === 'en-US' && <img className="exp" src={en1} alt="" />}
            <img className="divider" src={proAct} alt="" />
            <div className="tip active">{t('home.part1')}</div>
          </div>
          <div className="item">
            {language === 'zh-CN' && <img className="exp" src={p2} alt="" />}
            {language === 'en-US' && <img className="exp" src={en2} alt="" />}
            <img className="divider" src={pro} alt="" />
            <div className="tip">{t('home.part2')}</div>
          </div>
          <div className="item">
            {language === 'zh-CN' && <img className="exp" src={p3} alt="" />}
            {language === 'en-US' && <img className="exp" src={en3} alt="" />}
            <img className="divider" src={pro} alt="" />
            <div className="tip">{t('home.part3')}</div>
          </div>
          <div className="item">
            {language === 'zh-CN' && <img className="exp" src={p4} alt="" />}
            {language === 'en-US' && <img className="exp" src={en4} alt="" />}
            <img className="divider" src={pro} alt="" />
            <div className="tip">{t('home.part4')}</div>
          </div>
          <div className="item">
            {
              windowSize === EquType.PC ?
                <>
                  {language === 'zh-CN' && <img className="exp" src={p5} alt="" />}
                  {language === 'en-US' && <img className="exp" src={en5} alt="" />}
                  <img className="divider" src={pro} alt="" />
                  <div className="tip">{t('home.part51')}<br /> {t('home.part52')}</div>
                </> :
                <>
                  <div className="tip" style={{ marginTop: '6px' }}>{t('home.part52')}</div>
                  {language === 'zh-CN' && <img className="exp" src={p5} alt="" />}
                  {language === 'en-US' && <img className="exp" src={en5} alt="" />}
                  <img className="divider" src={pro} alt="" />
                  <div className="tip">{t('home.part51')}</div>
                </>
            }
          </div>
        </div>
      </div>

      <div className="org-draw">
        <div className="p-title">
          <img src={titleBg} alt="" />
          <span>{t('home.DesignConcept')}</span>
        </div>
        {
          windowSize === EquType.PC ?
            <img src={orgDraw} alt="" /> :
            <>
              <img src={mm1} alt="" />
              <img src={mm2} alt="" />
              <img src={mm3} alt="" />
              <img src={mm4} alt="" />
              <img src={mm5} alt="" />
              <img src={mm6} alt="" />
            </>
        }
      </div>
      <Footer style={{
        position: windowSize === EquType.PC ? 'absolute' : 'relative',
        bottom: 0,
        left: 0,
        right: 0
      }} />
    </HomeWrapper>
  )
}

export default Home
