
import { Input, InputNumber, ModalProps, Spin } from 'antd'
import { InputModalStyle } from './style'
import Button from '../Button'
import closeImg from 'src/assets/images/dialog/role_dialog/close.png'
import titleRight from 'src/assets/images/dialog/transfer_dialog/titleRight.png'
import titleLeft from 'src/assets/images/dialog/transfer_dialog/titleLeft.png'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


export interface I_inputrDialogProps extends ModalProps {
  title?:any
  id?:string
  max?:number
  initValue?:string
  placeholder?:string
  btnText?:string
  type?:'input'|'number'
  isShowTitleIcon?:boolean
  onOkCallBack: (value: string) => void
}
const InputDialog: React.FC<I_inputrDialogProps> = ({
  id='',
  title,
  initValue='',
  placeholder='',
  max=0,
  type='input',
  isShowTitleIcon=false,
  btnText,
  onOkCallBack,

  ...props
}) => {
  const [inputValue, setInputValue]=useState(initValue)
  const { t } = useTranslation()
  // 没有显示，渲染空
  if (!props.visible) return <></>

  return (
    <InputModalStyle
      width={496}

      title={null}
      centered
      maskClosable={false}
      destroyOnClose
      closable={false}
      footer={null}
      getContainer={() => document.getElementById(id) || document.body}
      {...props}
    >
      <div className="w-full flex justify-end">
        <img
          className="w-6 h-6 cursor-pointer"
          src={closeImg}
          alt=""
          onClick={props.onCancel}
        />
      </div>
      {
        title&& <div className="row">
          {isShowTitleIcon&& <img className="" src={titleLeft} alt="" />}
          <span className="pr-4 pl-4  text-xl titleText">
            {title}
          </span>
          {isShowTitleIcon&& <img className="" src={titleRight} alt="" />}
        </div>
      }

      <div className="row">
        {
          type==='input'?


            <Input
              className="width100 inputClass"
              placeholder={placeholder}
              value={inputValue}
              addonAfter={
                <div onClick={() =>{ setInputValue(max+'') }}>Max</div>
              }
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
            ></Input>:<InputNumber value={inputValue} onChange={(value)=>{ setInputValue(value) }} />
        }

      </div>

      <div className="row mb-2">
        <Spin spinning={false} size="small">
          <Button
            width="186px"
            height="46px"
            fontSize="18px"
            bold
            img={btnRedBg}
            onClick={()=>{ onOkCallBack(inputValue) }}
          >
            {btnText??t('game.card.Receive')}
          </Button>
        </Spin>
      </div>
    </InputModalStyle>
  )
}

export default InputDialog
