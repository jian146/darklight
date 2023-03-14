import { useWeb3React } from '@web3-react/core'
import iconRecord from 'src/assets/images/game/adventure/icon_record.png'
import { message, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import addIcon from 'src/assets/images/game/backpack/forge/addIcon.png'
import topIcon from 'src/assets/images/game/backpack/forge/topIcon.png'
import { ForgeStyle } from './style'
import { useState, useEffect } from 'react'
import tramsferImg from 'src/assets/images/liquidity/arrow.png'
import { I_Equip } from '../backpack'
import Star from 'src/components/Star/star'
import Button from 'src/components/Button'
import ChoseEquip from './components/choseEquip'
import { equipImgComPath } from '../backpack/equipUtils'
import { recastAbi } from 'src/web3/equip'
import { checkGold, queryAndApprove } from 'src/web3'
import {
  getForgeInfoApi,
  I_recastApi,
  recastApi
} from 'src/pages/api/backpack'
import { attrList } from 'src/components/Dialog/equipmentDialog/equipmentDialog'
import ResultDialog, {
  ResultDialogProps
} from 'src/components/Dialog/ResultDialog'
import { useSetState } from 'ahooks'
import LogPage, { I_forgeErrorLog, I_logInfoList } from './LogPage/LogPage'
import storage from 'src/utils/storage'
import Back from 'src/components/Back'
import { getInfosApi } from 'src/pages/api/equip'
import { I_ServerError } from 'src/pages/api/request'

export interface I_boxItem {
  title: string;
  count: number | string;
  btnText: string;
  disabled?: boolean;
  onClick: () => void;
}
interface I_Forge {
  mainEquip: I_Equip | undefined;
  logPageCall?: (isOpen: boolean) => void;
}
export type I_Equip_key = keyof I_Equip;
const Forge = (props: I_Forge) => {
  //锻造价格
  const priceList = [300, 600, 1500]
  const {
    t,
    i18n: { language }
  } = useTranslation()

  const { library, account } = useWeb3React()
  const [mainEquip, setMainEquip] = useState(props.mainEquip)
  const [subEquipList, setSubnEquipList] = useState<
    (I_Equip | null | I_recastApi)[]
      >([null, null])
  const [loading, setLoading] = useState(false)
  const [isShowChoseEquip, setIsShowChoseEquip] = useState(false)
  const [choseIndex, setChoseIndex] = useState(-1)
  const [forgeType, setForgeType] = useState(0)
  const [logShow, setLogShow] = useState(false)
  const [forgeErrorLog, setForgeErrorLog] = useState<I_forgeErrorLog[]>([])

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
  const attrEnList = [
    {
      attrName: 'dbrk',
      text: t('game.backpack.InjuryMultiple')
    },
    {
      attrName: 'dmg',
      text: t('game.backpack.PhysicalAttack')
    },
    {
      attrName: 'mag',
      text: t('game.backpack.MagicAttack')
    },
    {
      attrName: 'def',
      text: t('game.backpack.Defense')
    },
    {
      attrName: 'res',
      text: t('game.backpack.Resistance')
    },
    {
      attrName: 'hp',
      text: t('game.backpack.HP')
    },
    {
      attrName: 'str',
      text: t('game.strength')
    },
    {
      attrName: 'spt',
      text: t('game.mind')
    },
    {
      attrName: 'agi',
      text: t('game.agility')
    },
    {
      attrName: 'wil',
      text: t('game.will')
    },
    {
      attrName: 'con',
      text: t('game.stamina')
    },
    {
      attrName: 'inte',
      text: t('game.intelligence')
    }
  ]
  const isDisabledForge = mainEquip && mainEquip.castLv >= mainEquip.forge
  useEffect(() => {
    if (account) {
      reload()
      setLoading(false)
    }
  }, [account, library])

  const reload = async () => {
    getForgeErrorLog()
    setLoading(true)
    await getForgeInfo()
  }

  const getForgeErrorLog = () => {
    const list = storage.getObject('forgeErrorLogKey')
    !!list ? setForgeErrorLog(list) : setForgeErrorLog([])
  }
  const getForgeInfo = async () => {
    const myAddress = await library.getSigner().getAddress()
    getForgeInfoApi(myAddress).then((res) => {
      if (res) {
        setForgeType(res.forgeType)
      } else {
      }
    })
  }
  const onChoseEquip = (equip: I_Equip) => {
    setLoading(false)
    if (choseIndex === -1) {
      setMainEquip({ ...equip })
      setIsShowChoseEquip(false)
      // setShowQuest(false)
      return
    }
    subEquipList[choseIndex] = equip
    setSubnEquipList([...subEquipList])
    setIsShowChoseEquip(false)
  }

  /**
   * 锻造
   */
  const onForging = async (type: number) => {
    setLoading(true)

    try {
      if (account) {
        if (!(await checkGold(library, priceList[type]))) {
          message.info(t('message.gold_Insufficient'))
          return false
        }
        const goldIsPass = await queryAndApprove(
          library,
          account,
          'equip',
          'dlt'
        )
        if (!goldIsPass) {
          //授权失败
          message.warn(t('message.privilegeGrantFailed'))
          return
        }
      } else {
        return
      }
      if (!mainEquip) {
        message.info(t('game.backpack.PleaseSelectMainEquipment'))
        setLoading(false)
        return
      }
      if (!subEquipList[0] || !subEquipList[1]) {
        message.info(t('game.backpack.PleaseSelectConsumableEquipment'))
        setLoading(false)
        return
      }
      if (isDisabledForge) {
        message.info(t('game.backpack.ForgeLevelOut'))
        setLoading(false)
        return
      }
      const abiRes = await recastAbi(
        library,
        // mainEquip.tokenId,
        // subEquipList[0].tokenId,
        // subEquipList[1].tokenId,
        type
      )

      if (abiRes) {
        if (abiRes.events) {
          for (const event of abiRes.events) {
            if (event.event === 'Recast') {
              const args = event.args
              //调用前面前存起来
              const apiData:I_forgeErrorLog={
                tokenId: mainEquip.tokenId,
                castId: args.castId.toHexString(),
                castType: args.castType.toNumber(),
                subTokenId: [subEquipList[0].tokenId, subEquipList[1].tokenId],
                player: args.player,
                time: new Date().getTime()
              }
              forgeErrorLog.push(apiData)
              //保存请求信息
              storage.setObject('forgeErrorLogKey', forgeErrorLog)
              recastToServer(apiData)

            }
          }
        }
      }
      setSubnEquipList([null, null])
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  /**
   * 请求到服务器
   * @param apiData 服务器所需要参数
   */
  const recastToServer=async(apiData:I_forgeErrorLog)=>{
    try {
      // const siger = await getSigner(
      //   library,
      //   `recast:${apiData.castId}:${apiData.castType}`
      // )
      const apiRes = await recastApi(
        // apiData.tokenId,

        apiData.castId,
        apiData.tokenId,
        apiData.subTokenId[0],
        apiData.subTokenId[1]
        // apiData.castType,
        // apiData.player,
        // siger
      )

      //服务器提示报错
      if (apiRes&&(apiRes as I_ServerError).errMsg){
        clearErrorLog( apiData.castId)
        setResModalConfg({
          type: 'fail',
          content: (apiRes as I_ServerError).errMsg,
          visible: true
        })
        return
      }
      try {
        const successApiRes:I_recastApi=apiRes as I_recastApi
        if (successApiRes.tokenId){
          clearErrorLog(apiData.castId)
        }
        //正常请求
        if (successApiRes && successApiRes.success) {

          setForgeType(successApiRes.forgeType)
          setMainEquip({ ...successApiRes })
          // message.success('success')
          setResModalConfg({
            type: 'success',
            content: t('game.backpack.EquipmentForgingSucceeded'),
            visible: true
          })
          // setShowQuest(false)
        } else {
          if (apiRes && successApiRes.forgeType !== undefined) {
            setForgeType(successApiRes.forgeType)
          }
          // message.success('fail')
          setResModalConfg({
            type: 'fail',
            content: apiRes
              ? t('game.backpack.EquipmentForgingFailed')
              : t('message.serverError'),
            visible: true
          })
        }
      } catch (error) {
        setResModalConfg({
          type: 'fail',
          content: t('message.serverError'),
          visible: true
        })
        return
      }
    } catch (error) {
      //签名被拒绝
      return
    }


  }

  const clearErrorLog=(castId:string)=>{
    const findIndex= forgeErrorLog.findIndex((item)=>{ return item.castId===castId })
    if (findIndex>=0){
      forgeErrorLog.splice(findIndex, 1)
      storage.setObject('forgeErrorLogKey', forgeErrorLog)
    }

  }
  /**
   * 渲染消耗装备
   * @param index 所有
   * @returns dom
   */
  const renderSubImg = (index: number) => {
    const equipData = subEquipList[index]
    return (
      <div
        className={`boxItem  ${index === 0 ? 'leftItem' : 'rightItem'}`}
        onClick={() => {
          setChoseIndex(index)
          setIsShowChoseEquip(true)
        }}
      >
        <img
          alt=""
          className={`img ${equipData ? 'equipImg' : ''}`}
          src={equipData ? equipImgComPath + equipData.name + '.png' : addIcon}
        />
        <div className="boxItemDec">
          {t('game.backpack.ConsumableEquipment')}
        </div>
      </div>
    )
  }
  const renderTextBox = (className: string) => {
    return (
      <div className={`textBox ${className}`}>
        <p>1. {t('game.forge.mes1')}</p>
        <p>2. {t('game.forge.mes2')}</p>
        <p>3. {t('game.forge.mes3')}</p>
        {/* <p> {t('game.forge.mes4')}</p> */}
      </div>
    )
  }
  /**
   * 锻造重试
   * @param type 锻造等级
   */
  const onForgingRetry = async (item:I_logInfoList) => {
    setLogShow(false)
    setLoading(true)
    const res=await getInfosApi([item.tokenId])
    if (res&&res[0]){
      setMainEquip({ ...res[0] })
      await recastToServer({...item as I_forgeErrorLog})

    }
    setLoading(false)


  }
  return (
    <ForgeStyle>
      {!logShow ? (
        <Spin spinning={loading}>
          {/* 选择英雄框 */}
          {isShowChoseEquip && (
            <ChoseEquip
              setLoading={setLoading}
              setVisible={setIsShowChoseEquip}
              onChoseEquip={onChoseEquip}
              filterList={[
                mainEquip?.tokenId ?? '',
                subEquipList[0] ? subEquipList[0].tokenId : '',
                subEquipList[1] ? subEquipList[1].tokenId : ''
              ]}
            />
          )}
          <div className="topRow">
            <div
              className="record"

            >
              <img src={iconRecord} alt="" onClick={() => {
                setLogShow(true)
                props.logPageCall && props.logPageCall(true)
              }} />
              <span onClick={() => {
                setLogShow(true)
                props.logPageCall && props.logPageCall(true)
              }}>{t('game.forge.forgingAbnormalityRecord')}</span>
            </div>
          </div>
          <div className="main">
            <div className="title">{t('game.backpack.EquipmentForging')}</div>
            <div className="leftContent">
              <div className="forgeBox">
                <div
                  className="boxItem mainItem"
                  onClick={() => {
                    setChoseIndex(-1)
                    setIsShowChoseEquip(true)
                  }}
                >
                  <img
                    alt=""
                    className={`img ${mainEquip ? 'equipImg' : ''}`}
                    src={
                      mainEquip
                        ? equipImgComPath + mainEquip.name + '.png'
                        : addIcon
                    }
                  />
                  <div className="boxItemDec">
                    {t('game.backpack.MainEquipment')}
                  </div>
                </div>
                {renderSubImg(0)}
                {renderSubImg(1)}
              </div>
              {renderTextBox('topTextBox')}
            </div>
            <div className="rightContent">
              <div className="titleRow">
                {mainEquip && (
                  <>
                    <span>
                      <span className="equipName">
                        {language === 'en-US' ? mainEquip.en : mainEquip.name}
                      </span>
                      <span className="equipUpLevel">
                        (+{mainEquip.castLv}/{mainEquip.forge})
                      </span>
                    </span>
                    {/* 星级 */}
                    <span>
                      {' '}
                      <Star count={mainEquip.rarity} />
                    </span>
                  </>
                )}
              </div>
              <div className="attrRow">
                {mainEquip &&
                  mainEquip.canForgeAttrs.map((attrName, index) => {
                    const addValue =
                      mainEquip.casts[attrList.indexOf(attrName)]

                    return (
                      <div className="attrItem" key={index}>
                        <span className="attrLeft">
                          <span className="attrName">
                            {' '}
                            {
                              attrEnList.find((findItem) => {
                                return findItem.attrName === attrName
                              })?.text
                            }
                          </span>
                          <span className="attrNumber">
                            {((attrName === 'dbrk' || attrName === 'rbrk'
                              ? mainEquip.dbrk + mainEquip.rbrk
                              : mainEquip[attrName as I_Equip_key]) as number) -
                              addValue}
                          </span>
                        </span>
                        <span className="attrRight">
                          <img className="transIcon" alt="" src={tramsferImg} />
                          <span className="newAttrNumber">
                            {addValue === 0 ? '?' : addValue}
                          </span>
                          <img className="topIcon" alt="" src={topIcon} />
                        </span>
                      </div>
                    )
                  })}
              </div>
              <div className="btnRow">
                <div className="btnRowItem">
                  <Button
                    width="144px"
                    height="46px"
                    bold
                    disabled={isDisabledForge}
                    className="es-button"
                    // disabled={!isDisabled}
                    onClick={async () => {
                      //有效性验证,判断余额
                      onForging(0)
                    }}
                  >
                    {t('game.backpack.FoundationForging')}
                  </Button>
                  <div className="btnPrice">{priceList[0]}Gold</div>
                </div>

                <div className="btnRowItem">
                  <Button
                    width="144px"
                    height="46px"
                    bold
                    disabled={!(forgeType >= 1) || isDisabledForge}
                    className="es-button"
                    onClick={async () => {
                      //有效性验证,判断余额
                      onForging(1)
                    }}
                  >
                    {t('game.backpack.MasterForging')}
                  </Button>
                  <div className="btnPrice">{priceList[1]}Gold</div>
                </div>

                <div className="btnRowItem">
                  <Button
                    width="144px"
                    height="46px"
                    bold
                    disabled={!(forgeType >= 2) || isDisabledForge}
                    className="es-button"
                    onClick={async () => {
                      //有效性验证,判断余额
                      onForging(2)
                    }}
                  >
                    {t('game.backpack.PalaceForging')}
                  </Button>
                  <div className="btnPrice">{priceList[2]}Gold</div>
                </div>
              </div>
              {renderTextBox('bottomTextBox')}
            </div>
          </div>
          {/* 操作结果窗口 */}
          <ResultDialog
            visible={resModalConfg.visible}
            type={resModalConfg.type}
            content={resModalConfg.content}
            onCancel={() => setResModalConfg({ visible: false })}
          />
        </Spin>
      ) : (
        <div className="w-full">
          <div>
            <Back
              className="clossBack-forge"
              backCall={() => {
                setLogShow(false)
                props.logPageCall && props.logPageCall(false)
              }}
            />
          </div>
          <div>
            <LogPage onForgingRetry={onForgingRetry} logList={forgeErrorLog} forgeType={forgeType} />
          </div>
        </div>
      )}
    </ForgeStyle>
  )
}
export default Forge
