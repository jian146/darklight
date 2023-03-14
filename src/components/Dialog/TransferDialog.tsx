
import { Input, ModalProps, Spin } from 'antd'
import { TransferModal } from './style'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import closeImg from 'src/assets/images/dialog/role_dialog/close.png'
import titleRight from 'src/assets/images/dialog/transfer_dialog/titleRight.png'
import titleLeft from 'src/assets/images/dialog/transfer_dialog/titleLeft.png'
import btnRedBg from 'src/assets/images/common/btn_red.png'

type i_idOnChange=(value: string) => void

export interface transferDialogProps extends ModalProps {
  id?: string;
  idOnChange: i_idOnChange;
}
const HeroDialog: React.FC<transferDialogProps> = ({
  id = '',
  idOnChange,
  ...props
}) => {
  const { t } = useTranslation()
  // 没有显示，渲染空
  if (!props.visible) return <></>

  return (
    <TransferModal
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
      <div className="row">
        <img className="" src={titleLeft} alt="" />
        <span className="pr-4 pl-4  text-xl titleText">
          {t('game.heros.transfer')}
        </span>
        <img className="" src={titleRight} alt="" />
      </div>
      <div className="row">
        <Input
          className="width100 inputClass"
          placeholder={t('game.heros.transferAddress')}
          onChange={(e) => {
            idOnChange(e.target.value)
          }}
        ></Input>
      </div>

      <div className="row mb-2">
        <Spin spinning={false} size="small">
          <Button
            width="186px"
            height="46px"
            fontSize="18px"
            bold
            img={btnRedBg}
            onClick={props.onOk}
          >
            {t('game.card.Receive')}
          </Button>
        </Spin>
      </div>
    </TransferModal>
  )
}

export default HeroDialog
