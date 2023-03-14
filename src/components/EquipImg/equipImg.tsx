
import { useState } from 'react'
import { I_Equip } from 'src/pages/game/widgets/backpack'
import { equipImgComPath } from 'src/pages/game/widgets/backpack/equipUtils'
import EquipmentDialog from '../Dialog/equipmentDialog/equipmentDialog'
import loseImg from 'src/assets/images/game/arena/lose.png'
import { EquipImgStyle } from './style'

interface I_EquipImg{
    width?: number|string;
    height?:number|string;
    equip:I_Equip;
    style?:any
    className?:string
    isShowDetail?:boolean
    isShowLose?:boolean;
    onImgClick?:(equip:I_Equip) => void
}
const EquipImg=(props:I_EquipImg)=>{
  const {equip, width=120, height=120, style, className, isShowDetail=true, onImgClick, isShowLose=false} = props
  const [visible, setVisible]=useState(false)

  return <EquipImgStyle key={equip.tokenId}>
    <div
      className={` box ${className}`}
      onClick={()=>{
        if (isShowDetail){
          setVisible(true)
          return
        }
        onImgClick&&onImgClick(equip)
      }}
      style={{
        backgroundImage: `url(${equip?require(`src/assets/images/game/backpack/equipBg/bg_${equip.rarity}x.png`):''})`,
        height: height,
        width: width,
        ...style
      }}
    >
      {/* 失去装备图标表示 */}
      {isShowLose&&<img className='loseIcon' src={loseImg} alt="" />}
      <img
        src={equipImgComPath+equip.name+'.png'}
        alt=""
      />
    </div>
    {
      equip&& <EquipmentDialog
        equip={equip}
        btnType={''}
        onBtnClick={()=>{
          setVisible(false)
        }}
        visible={visible}
        onCancel={()=>{ setVisible(false) }} />

    }
    {/* <Popover
      title={<div className="name"
        style={{
          color: '#B2855E',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}
      ><span style={{
          marginRight: 5,
          lineHeight: '17px'
        }}>
          {equip.name}
        </span>
        <Star count={equip.rarity} />
      </div>}
      content={content}
      trigger={isShowDetail?'click':''}
      overlayClassName="PopoverStyle"
      style={{
        backgroundColor: 'blue !import'
      }}
      {...props}>
      <div
        className={` box ${className}`}
        onClick={()=>{ onImgClick&&onImgClick(equip) }}
        style={{
          height: height,
          width: width,
          ...style
        }}
      >
        <img
          src={equipImgComPath+equip.name+'.png'}
          alt=""
        />
      </div>
    </Popover> */}

  </EquipImgStyle>

}

export default EquipImg
