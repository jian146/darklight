import { useParams } from 'react-router-dom'
import Back from 'src/components/Back'
import { MineDetailWrapper } from './style'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, message, notification, Spin } from 'antd'
import { DropdownMenu, DropdownMenuItem } from 'src/components/DropdownMenu'
import Button from 'src/components/Button'
import WorkHeroListItem from './WorkHeroListItem'
import { EquType, useWindowSize } from 'src/context'
import BottomDrawer from 'src/components/BottomDrawer'
import titleBg from 'src/assets/images/game/hero/bg_title.png'
import decoratorImg from 'src/assets/images/mine_detail/decorator.png'
import arrowImg from 'src/assets/images/mine_detail/arrow.png'
import lineSelect from 'src/assets/images/mine_detail/line_select.png'
import mineImgDivider from 'src/assets/images/mine_detail/mine-line-divider.png'
import { WorkHeroType } from 'src/types/mine'
import { extractJobRewards, getJobAuthorize, getJobList, jobAuthorize, startJob, endJobsAbi } from 'src/web3/job'
import { useWeb3React } from '@web3-react/core'
import useMountedRef, { subTokenId } from 'src/utils'
import { myHerosNew } from 'src/web3/hero'
import { HeroType, Occupations } from 'src/types/hero'
import { getWrokQueryParam, jobFilter } from './utils'
import { useSetState } from 'ahooks'
import classnames from 'classnames'
import { MineDetailImg, mineMap } from 'src/config/mine'
import NoData from 'src/components/NoData'
import NoviceImgMark from 'src/components/NoviceImgMark'
import btnBg from 'src/assets/images/common/btn_arrow_red.png'
import btnMine from 'src/assets/images/common/btn_mine.png'
import radioImg from 'src/assets/images/common/radio.png'
import radioCheckImg from 'src/assets/images/common/radioCheck.png'

const MineDetail: React.FC = () => {

  const { workname } = useParams()
  const { t } = useTranslation()
  const mountedRef = useMountedRef()
  const { account, library } = useWeb3React()
  const { windowSize } = useWindowSize()
  // 页面事件状态
  const [pageEventState, setPageEventState] = useSetState({
    showDrawer: false,
    loading: false,
    heroListLoading: false,
    jobAuthorize: false
  })
  const [heros, setHeros] = useState<HeroType[]>([])
  const [selectHeroId, setSelectHeroId] = useState<string>('')
  const [workHeroList, setWorkHeroList] = useState<WorkHeroType[]>([])
  const [checkList, setCheckList] = useState<string[]>([])

  // 获取背景
  const currentMineBg = useMemo(
    () => {
      const target = MineDetailImg.find(
        item => item.name === workname
      )
      if (target) {
        return target[windowSize === EquType.PC ? 'img':'mImg']
      }
      return ''
    },
    [windowSize, workname]
  )

  // 获取当前兼职信息
  const currentMine = useMemo(
    () => mineMap.find(item => item.name === workname), [workname]
  )

  const renderReward = useMemo(() => () => {
    return currentMine?.reward.map((item, index) => (
      <img src={item} key={item + index} className="ml-1" alt="" />
    ))
  }, [currentMine])

  // 获取英雄
  const getHero = useCallback(async () => {
    if (!currentMine) return
    try {
      setPageEventState({loading: true})
      const heros = await myHerosNew(library)
      if (mountedRef.current) {
        // 根据不同的工作，过滤英雄
        setHeros(jobFilter(heros, currentMine))
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: (error as Error).message
      })
    } finally {
      setPageEventState({loading: false})
    }

  }, [library, mountedRef, currentMine])

  useEffect(() => {
    if (account) {
      getHero()
    }
  }, [account, getHero])

  useEffect(() => {
    // 查询授权
    if (account) {
      getJobAuthorize(library).then(res => {
        setPageEventState({jobAuthorize: res})
      })
    }
  }, [account])


  const getWorkHeroList = useCallback(() => {
    if (currentMine === undefined) return
    // 查询工作列表
    if (account) {
      setPageEventState({heroListLoading: true})
      getJobList(library, currentMine.mapId).then(res => {
        setWorkHeroList(res)
      }).catch(e => {
        notification.error({
          message: 'Error',
          description: e.message
        })
      }).finally(() => {
        setPageEventState({heroListLoading: false})
      })
    }
  }, [account, currentMine])

  useEffect(() => {
    getWorkHeroList()
  }, [getWorkHeroList])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 授权
  const authorize = async () => {
    return await jobAuthorize(library)
  }
  //s刷新
  const roload = () => {
    setCheckList([])
    getWorkHeroList()
  }
  // 开始工作
  const handleStartWork = async () => {
    if (currentMine === undefined) return
    try {
      setPageEventState({loading: true})
      if (!pageEventState.jobAuthorize) {
        // 授权
        await authorize()
      }
      // 开始工作
      await startJob(
        library,
        selectHeroId,
        // 除了兼职（1）其他暂时设定为 2
        getWrokQueryParam(currentMine.name),
        currentMine.mapId
      )
      // 重新获取工作列表
      roload()
      notification.success({
        message: 'success',
        description: 'success'
      })
      // 清除选中的状态
      setSelectHeroId('')
      // 重新获取英雄
      getHero()
    } catch (e: any) {
      notification.error({
        message: 'Error',
        description: e.message
      })
    } finally {
      setPageEventState({loading: false})
    }
  }

  //一键收菜
  const claimJobRewards = async () => {
    if (checkList.length<=0) {
      return message.info(t('message.AtLeastOne'))
    }

    try {
      setPageEventState({heroListLoading: true})
      extractJobRewards(library, checkList).then((res)=>{
        roload()
        notification.success({
          message: 'Success',
          description: t('game.mine.oneClickIncome') + t('success')
        })
      }).finally(()=>{
        setPageEventState({heroListLoading: false})
      })
    } catch (e: any) {
      notification.error({
        message: 'Error',
        description: e.message
      })
    } finally {


    }
  }
  //一键退出
  const onEndJobsAbi = async () => {
    if (checkList.length<=0) {
      return message.info(t('message.AtLeastOne'))
    }

    try {
      setPageEventState({heroListLoading: true})
      endJobsAbi(library, checkList).then((res)=>{
        roload()
        notification.success({
          message: 'Success',
          description: t('game.mine.oneClickSignOut') + t('success')
        })
      }).finally(()=>{
        setPageEventState({heroListLoading: false})
      })
    } catch (e: any) {
      notification.error({
        message: 'Error',
        description: e.message
      })
    } finally {


    }
  }
  const menu = useMemo(() => (
    <DropdownMenu onClick={(e) => setSelectHeroId(e.key)}>
      {
        heros.length > 0 ? heros.map(item => (
          <DropdownMenuItem key={item.tokenId}>
            <div
              style={{
                borderBottom: '1px solid #272225',
                marginTop: '14px'
              }}
              className="flex mx-3 flex-col h-14 text-primary"
            >
              <div className="flex text-sm items-center relative">
                <span className="flex text-sm items-center">
                  <i className="not-italic text-base">
                    {t(`home.${Occupations[item.occupation]}`)}
                  </i>
                  <i className="not-italic ml-2">LV.{item.level}</i>
                </span>
                <span className="h-14px w-1px mx-5 bg-primary" />
                <span>{t('game.FatigueValue')} {item.fatigue}</span>
                { item.newbie && <NoviceImgMark top={20} right={60} height={22} /> }
              </div>
              <div
                style={{ color: '#664F42' }}
                className="tokenid text-xs"
              >
                Token ID: {subTokenId(item.tokenId)}
              </div>
            </div>
          </DropdownMenuItem>
        )) :
          <DropdownMenuItem key={''}>
            <NoData />
          </DropdownMenuItem>
      }
    </DropdownMenu>
  ), [heros, t])

  const renderAllCheck=() =>{
    //0 未选中  1全选  2多选
    let text=''
    let imgStyles={}
    let fn=()=>{
      setCheckList([])
      const newList=workHeroList.map((item)=>{
        const tokenId=item.tokenId
        return tokenId

      })
      setCheckList([...newList])
    }
    if (checkList.length===0){
      text=t('game.mine.allSelect')
      imgStyles={
        display: 'none'
      }
    } else if ( checkList.length===workHeroList.length){
      text=t('game.mine.allSelect')
      imgStyles={

      }
      fn=()=>{
        setCheckList([])
      }

    } else {
      imgStyles={
        filter: 'grayscale(1)'
      }
      text=t('game.mine.multipleSelect')

    }

    return (
      <div className="flex  items-center justify-center mr-5">
        <div onClick={()=>{ fn() }} style={{width: 35}} className="flex relative items-center justify-center cursor-pointer mr-2">
          <img src={radioImg} alt=""></img>
          <img
            style={imgStyles}
            src={radioCheckImg} className="absolute " alt=""></img>
        </div>
        <span style={{
          whiteSpace: 'nowrap'
        }}>{text}</span>
      </div>
    )
  }
  return (
    <MineDetailWrapper className="max-w-screen-1200 mx-auto">
      <Back />
      {

        currentMine && <Spin spinning={pageEventState.loading}>
          <div className="w-full md:mt-16 mt-28">
            <div className="p-3">
              <div className="top pb-16 md:pb-0">
                <div className="w-full p-6 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={currentMineBg} alt=""
                  />
                  <img
                    src={decoratorImg}
                    className="decorator absolute left-0 top-0"
                    alt=""
                  />
                  <img
                    src={decoratorImg}
                    className="decorator absolute top-0 right-0"
                    alt=""
                  />
                  <img
                    src={decoratorImg}
                    className="decorator absolute left-0 bottom-0"
                    alt=""
                  />
                  <img
                    src={decoratorImg}
                    className="decorator absolute right-0 bottom-0"
                    alt=""
                  />

                  <div
                    className="title absolute -top-20 md:-top-5 left-1/2
                              -translate-x-1/2"
                  >
                    <img src={titleBg} alt="" />
                    <span
                      className="absolute top-1/2 left-1/2 text-secondary
                      text-base"
                    >
                      {t(`game.mine.${currentMine.name}`)}
                    </span>
                  </div>
                  <div
                    className="award absolute -bottom-12 md:bottom-7 md:right-7
                                right-1/2 transform translate-x-1/2 flex px-3
                                justify-between items-center md:-translate-x-0"
                  >
                    <span className="text-secondary">
                      {t('game.mine.workReward')}
                    </span>
                    <span className="flex">
                      {
                        renderReward()
                      }
                    </span>
                  </div>
                  <div
                    className={classnames('mselect absolute top-1/2 md:hidden', {
                      hidden: selectHeroId !== ''
                    })}
                    onClick={() => setPageEventState({showDrawer: true})}
                  >
                    <div className="content w-full flex items-center flex-col
                                    justify-center">
                      <img src={lineSelect} alt="" />
                      <span className="flex items-center h-14">
                        <p
                          className="text-base text-secondary mr-10"
                        >
                          {t('game.mine.mineChoseHero')}
                        </p>
                        <img className="w-4" src={arrowImg} alt="" />
                      </span>
                      <img src={lineSelect} alt="" />
                    </div>
                  </div>
                  <div
                    id="center"
                    className={classnames(
                      'select absolute left-1/2 top-1/2 hidden', {
                        'md:block': selectHeroId === ''
                      })}
                  >
                    <Dropdown
                      className="hidden md:block"
                      overlay={menu}
                      trigger={['click']}
                      placement="bottomCenter"
                      getPopupContainer={() => (
                        document.getElementById('center') || document.body
                      )}
                    >
                      <div>
                        <div className="flex items-center cursor-pointer">
                          <p className="chose-hero dropdown text-secondary
                                      text-base">
                            {t('game.mine.mineChoseHero')}
                          </p>
                          <img className="w-4" src={arrowImg} alt="" />
                        </div>
                      </div>
                    </Dropdown>
                  </div>
                  <div
                    className={classnames('btn absolute top-1/2 left-1/2', {
                      hidden: selectHeroId === ''
                    })}
                  >
                    <Button
                      width="192px"
                      height="48px"
                      img={btnBg}
                      fontSize="16px"
                      bold
                      onClick={handleStartWork}
                    >
                      {t('game.mine.startWorking')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Spin spinning={pageEventState.heroListLoading}>
              <div
                className="tips flex justify-between text-primary mt-16 px-4 md:px-0 editRow"
              >
                <div className="text-base flex items-center left-text" >
                  {t('game.mine.goldMiningRatio')}: 100%
                </div>
                <div className="text-base flex flex-nowrap btn-checkRow">
                  {/* 切换数据源移除2022年4月8日 */}
                  {/* {t('game.mine.switchDataSource')} */}

                  {renderAllCheck()}
                  <div className="flex flex-wrap btnBox">
                    <Button
                      img={btnMine}
                      width="162px"
                      height="46px"
                      className='left-btn'
                      bold
                      onClick={claimJobRewards}

                    >
                      {t('game.mine.oneClickIncome')}
                    </Button>
                    <Button
                      img={btnMine}
                      width="162px"
                      height="46px"

                      bold
                      onClick={onEndJobsAbi}

                    >
                      {t('game.mine.oneClickSignOut')}
                    </Button>
                  </div>
                </div>
              </div>


              <div className="my-6">
                <img src={mineImgDivider} className="max-w-full" alt="" />
              </div>
              {
                workHeroList.map(item => <WorkHeroListItem
                  checkList={checkList}
                  setCheckList={setCheckList}
                  key={item.tokenId}
                  hero={item}
                  onRoload={roload}
                  getWorkHeroList={getWorkHeroList}
                />)
              }
            </Spin>
          </div>
          <BottomDrawer
            visible={pageEventState.showDrawer}
            title={t('game.mine.mineChoseHero')}
            height={360}
            onClose={() => setPageEventState({showDrawer: false})}
          >
            {
              heros.length > 0 ? heros.map(item => (
                <div
                  key={item.tokenId}
                  style={{
                    borderBottom: '1px solid #272225',
                    marginTop: '14px'
                  }}
                  className="flex flex-col h-14 text-primary"
                  onClick={() => {
                    setSelectHeroId(item.tokenId)
                    setPageEventState({showDrawer: false})
                  }}
                >
                  <div className="flex text-sm items-center">
                    <span className="flex text-sm">
                      <i className="not-italic text-base">
                        {t(`home.${Occupations[item.occupation]}`)}
                      </i>
                      <i className="not-italic ml-2">LV.{item.level}</i>
                    </span>
                    <span className="h-14px w-1px mx-5 bg-primary" />
                    <span>{t('game.FatigueValue')} {item.fatigue}</span>
                  </div>
                  <div
                    style={{ color: '#664F42' }}
                    className="tokenid text-xs relative"
                  >
                    Token ID: {subTokenId(item.tokenId)}
                    { item.newbie && <NoviceImgMark top={-4} right="52%" height={20} /> }
                  </div>
                </div>
              )) :
                <NoData />
            }
          </BottomDrawer>
        </Spin>
      }
    </MineDetailWrapper>
  )
}

export default MineDetail
