import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'antd'
import { HeroImgList } from 'src/config'
import Button from 'src/components/Button'
import { HeroType, Occupations } from 'src/types/hero'
import { endJob, extractJobReward } from 'src/web3/job'
import { useWeb3React } from '@web3-react/core'
import { WorkHeroType } from 'src/types/mine'
import { subTokenId } from 'src/utils'
import Loading from 'src/components/Loading'
import RenderSpecTitle from '../widgets/heros/renderSpecTitle'
import classnames from 'classnames'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnRedBg from 'src/assets/images/common/btn_arrow_red.png'
import btnDarkBg from 'src/assets/images/common/btn_arrow_dark.png'
import HeroCheck from './components/heroCheck'
import { getAttrLevel } from 'src/utils/attributeSetting'

type I_setCheckList=(value: string[]) => void
type WorkListItemProps = {
  hero: WorkHeroType;
  checkList:string[];
  onRoload?:()=>void;
  setCheckList:I_setCheckList;
  getWorkHeroList?: () => void;
};

type operateType = 'claimReward' | 'quit';

const WorkHeroListItem = React.memo<WorkListItemProps>(({ hero, checkList, setCheckList, onRoload, ...props }) => {
  const { t } = useTranslation()
  const { library } = useWeb3React()
  const [loading, setLoading] = useState(false)

  const getOperateApi = (type: operateType): Promise<void> => {
    if (type === 'claimReward') {
      return extractJobReward(library, hero.tokenId)
    }
    return endJob(library, hero.tokenId)
  }

  const dateOperate = (type: operateType) => {
    setLoading(true)
    getOperateApi(type)
      .then(() => {
        onRoload&&onRoload()
        notification.success({
          message: 'Success',
          description: t(`game.mine.${type}`) + t('success')
        })
      })
      .catch((e) => {
        notification.error({
          message: 'Error',
          description: e.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <Loading fixed center spinning={loading} />}
      <div
        className="work-list h-20 hidden mx-2.5 justify-center items-center border
                   border-dashed rounded-lg"
      >
        <span className="no-work text-primary text-sm">
          {t('game.mine.nopositionfornow')}
        </span>
      </div>
      <div className="work-list flex px-2 justify-center flex-col border-0 mb-2 relative">
        <div className="wl-item py-3 md:px-0 px-5 flex items-center flex-wrap">
          <div className="hero-avatar flex justify-center items-center relative">
            <img
              className="h-4/5"
              src={HeroImgList[hero.occupation]}
              draggable="false"
              alt=""
            />
            {hero.newbie && <NoviceImgMark top={-12} right={-16} height={24} />}
          </div>
          <div className="hero-info flex flex-col ml-5 text-primary">
            <div>
              <span className="text-xl">
                {t(`home.${Occupations[hero.occupation]}`)}
              </span>
              <span className="text-lg ml-2">LV.{hero.level}</span>
            </div>
            <div className="text-sm">
              <span className="mr-2">{t('game.FatigueValue')}</span>
              <span className="text-valueColor">{hero.fatigue}</span>
            </div>
          </div>
          <div className="w-px h-12 bg-primary ml-4 mr-6 hidden md:block" />
          <div
            style={{ background: '#2F231C' }}
            className="h-px w-full md:hidden my-5"
          />
          <div
            className="attr md:flex-1 flex-wrap text-primary justify-between
                      flex w-full md:w-auto mb-5 md:mb-0"
          >
            <div className="flex w-full md:w-22% md:justify-around mb-5 md:mb-0">
              <div className="flex flex-col w-3/5 md:w-2/4">
                <div>Token ID</div>
                <div className="font-extrabold">{subTokenId(hero.tokenId)}</div>
              </div>
              <div className="flex flex-col md:items-center">
                <div>
                  <RenderSpecTitle type="strength" hero={hero as HeroType}>
                    {t('game.strength')}
                  </RenderSpecTitle>
                </div>
                <div
                  className={classnames('font-extrabold', {
                    primary: getAttrLevel('strength', hero as HeroType)
                  })}
                >
                  {hero.strength}
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-18% md:justify-around mb-5 md:mb-0">
              <div className="flex flex-col md:items-center w-3/5 md:w-auto">
                <div>
                  <RenderSpecTitle type="agility" hero={hero as HeroType}>
                    {t('game.agility')}
                  </RenderSpecTitle>
                </div>
                <div
                  className={classnames('font-extrabold', {
                    primary: getAttrLevel('agility', hero as HeroType)
                  })}
                >
                  {hero.agility}
                </div>
              </div>
              <div className="flex flex-col md:ml-1 md:items-center">
                <div>
                  <RenderSpecTitle type="stamina" hero={hero as HeroType}>
                    {t('game.stamina')}
                  </RenderSpecTitle>
                </div>
                <div
                  className={classnames('font-extrabold', {
                    primary: getAttrLevel('stamina', hero as HeroType)
                  })}
                >
                  {hero.stamina}
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-18% md:justify-around mb-5 md:mb-0">
              <div className="flex flex-col md:items-center w-3/5 md:w-auto">
                <div>{t('game.will')}</div>
                <div className="font-extrabold">{hero.will}</div>
              </div>
              <div className="flex flex-col md:ml-1 md:items-center">
                <div>
                  <RenderSpecTitle
                    type="intelligence"
                    hero={hero as HeroType}
                  >
                    {t('game.intelligence')}
                  </RenderSpecTitle>
                </div>
                <div
                  className={classnames('font-extrabold', {
                    primary: getAttrLevel('intelligence', hero as HeroType)
                  })}
                >
                  {hero.intelligence}
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-12% md:justify-around mb-5 md:mb-0">
              <div className="flex flex-col md:items-center w-3/5 md:w-auto">
                <div>
                  <RenderSpecTitle type="mind" hero={hero as HeroType}>
                    {t('game.mind')}
                  </RenderSpecTitle>
                </div>
                <div
                  className={classnames('font-extrabold', {
                    primary: getAttrLevel('mind', hero as HeroType)
                  })}
                >
                  {hero.mind}
                </div>
              </div>
              <div className="flex flex-col md:items-center">
                <div>{t('game.total')}</div>
                <div className="font-extrabold">{hero.total}</div>
              </div>
            </div>
            <div className="flex w-full md:w-22% md:justify-around mb-5 md:mb-0">
              <div className="flex flex-col md:items-center w-3/5 md:w-auto">
                <div>{t('game.mine.startingBlock')}</div>
                <div className="font-extrabold">{hero.blockN}</div>
              </div>
              <div className="flex flex-col md:items-center">
                <div>{t('game.heros.salaryGold')}</div>
                <div className="text-valueColor font-extrabold">
                  {hero.reward}
                </div>
              </div>
            </div>
          </div>
          <div className="btn md:ml-3 flex w-full md:w-auto justify-center md:justify-start">
            <Button
              width="132px"
              height="44px"
              img={btnRedBg}
              bold
              onClick={() => dateOperate('claimReward')}
            >
              {t('game.mine.claimReward')}
            </Button>
            <Button
              className="ml-4 w-32 h-11"
              width="132px"
              height="44px"
              img={btnDarkBg}
              bold
              onClick={() => dateOperate('quit')}
            >
              {t('game.mine.quit')}
            </Button>
          </div>
        </div>
        <HeroCheck value={checkList.indexOf(hero.tokenId)>=0}
          onChange={(value:boolean) =>{
            if (value){
              checkList.push(hero.tokenId)
              setCheckList([...checkList])
            } else {
              checkList.splice(checkList.indexOf(hero.tokenId), 1)
              setCheckList([...checkList])
            }
          }
          } />
      </div>
    </>
  )
})

export default WorkHeroListItem
