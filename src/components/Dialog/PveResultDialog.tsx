import React from 'react'
import { ModalProps } from 'antd'
import { ResultModalPve } from './style'
import winImg from 'src/assets/images/dialog/result_dialog/win.png'
import failImg from 'src/assets/images/dialog/result_dialog/fail.png'
import Button from '../Button'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import { useTranslation } from 'react-i18next'
import { I_Equip } from 'src/pages/game/widgets/backpack'
import { pocketList } from 'src/pages/game/widgets/lottery'
import EquipImg from '../EquipImg/equipImg'
import PriceImg from '../EquipImg/priceImg'

export interface ResultDialog_pve extends ModalProps {
  type: 'win' | 'fail',
  dlt?:string | React.ReactNode|number,
  gold?:string | React.ReactNode|number,
  modelType?:'pve'|'pvp'
  keyList?:I_Equip[][],
  equipList?:I_Equip[]
  isShowLose?:boolean;
}

const PveResultDialog: React.FC<ResultDialog_pve> = ({ type, keyList=[], equipList=[], isShowLose=false, modelType='pve', ...props }) => {

  const { t, i18n: {language} } = useTranslation()
  const commWidth=80
  return (
    <ResultModalPve
      centered
      destroyOnClose
      footer={null}
      closable={false}
      {...props}
    >
      <div className=" flex flex-col justify-start items-center">
        <img
          className="iconImg max-w-full transform scale-150 md:scale-100"
          src={type === 'win' ? winImg : failImg}
          style={{
            marginLeft: type === 'win'?35:0
          }}
          alt=""
        />

        <div className="textMain">
          <p className=" flex center-center mb-2 center text-2xl font-bold"
            style={{
              color: '#d68c3f'
            }}
          >
            {type === 'win' ?t('game.adventure.victoryInBattle'):t('game.adventure.battleFailed')}
          </p>
          {/* <div className="flex center-center mb-2">
            <span className='mr-2'>{t('game.heros.gold')}:</span>
            <span >{props.gold}</span>
          </div>
          <div className="flex center-center mb-2">
            <span className='mr-2'>DLT:</span>
            <span>{props.dlt}</span>
          </div> */}
          {/* 奖励图片 */}

          <div className="flex equipBox">
            {/* 如果什么奖励都没有 */}
            {
              props.dlt===0&&props.gold===0&&equipList.length===0&&<div className="equipBoxItem">
                <PriceImg width={commWidth} height={commWidth} className="equipItem" type={modelType==='pve'?'gold':'dlt'} count={0} />
                <div className="equipBoxItemText">{modelType==='pve'?'Gold':'DLT'}</div>
              </div>
            }
            {
              props.dlt!==0&& <div className="equipBoxItem">
                <PriceImg width={commWidth} height={commWidth} className="equipItem" type='dlt' count={props.dlt as number} />
                <div className="equipBoxItemText">DLT</div>
              </div>
            }
            {
              props.gold!==0&& <div className="equipBoxItem">
                <PriceImg width={commWidth} height={commWidth} className="equipItem" type='gold' count={props.gold as number} />
                <div className="equipBoxItemText">Gold</div>
              </div>
            }
            {/* 钥匙 */}
            {
              pocketList.map((keyItem, index)=>{
                if (keyList[index].length===0) return ''
                return <div className="equipBoxItem">
                  <PriceImg width={commWidth} height={commWidth} className="equipItem" type={'key'+keyList[index][0].key} count={keyList[index].length} />
                  <div className="equipBoxItemText"> {t(`game.adventure.${keyItem.title}Key`)}</div>
                </div>
              })
            }
            {/* 装备 */}
            {
              equipList.map((item, index)=>{
                return <div key={index+'equip'} className="equipBoxItem">
                  <EquipImg width={80} height={80} equip={item} className="equipItem" isShowLose={isShowLose} />
                  <div className="equipBoxItemText">{language==='en-US'?item.en:item.name}</div>
                </div>
              })
            }
          </div>
        </div>
        <div className="btnMargin" ></div>
        <Button
          width="186px"
          height="46px"
          fontSize="18px"
          bold
          img={btnRedBg}
          className="h-10"
          onClick={props.onOk}
        >
          {t('confirm')}
        </Button>
      </div>
    </ResultModalPve>
  )
}

export default PveResultDialog
