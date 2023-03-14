
import { ModalProps, Spin } from 'antd'

import Button from '../Button'
import { useTranslation } from 'react-i18next'
import closeImg from 'src/assets/images/dialog/role_dialog/close.png'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import btnDarkBg from 'src/assets/images/common/btn_dark.png'
import { ConfirmModel } from './style'


 interface ConfirmProps extends ModalProps {
  onOk: ()=>void
  onCancel: ()=>void
  title?: string
  cancelText?:string
  okText?:string
}
const Confirm: React.FC<ConfirmProps> = ({
  onOk,
  title='Error',
  children,
  cancelText,
  okText,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation()
  const initContent=<div className="initMessage">
    {t('message.serverErrorModel')}
  </div>
  // 没有显示，渲染空
  if (!props.visible) return <></>

  return (
    <ConfirmModel
      width={496}
      title={null}
      centered
      maskClosable={false}
      destroyOnClose
      closable={false}
      footer={null}
      {...props}
    >
      <div className="w-full flex justify-end">
        <img
          className="w-6 h-6 cursor-pointer"
          src={closeImg}
          alt=""
          onClick={onCancel}
        />
      </div>
      <div className="row items-center">
        <span className=" titleText">
          {title}
        </span>
      </div>
      <div>
        {children?children:initContent}
      </div>


      <Spin spinning={false} size="small">
        <div className=" btnRow mb-4 ">
          <Button
            width="186px"
            height="46px"
            fontSize="18px"
            bold
            img={btnDarkBg}
            onClick={onCancel}
          >
            {cancelText??t('cancel')}
          </Button>
          <Button
            width="186px"
            height="46px"
            fontSize="18px"
            bold
            img={btnRedBg}
            onClick={onOk}
          >
            {okText??t('retry')}
          </Button>
        </div>
      </Spin>

    </ConfirmModel>
  )
}
export default Confirm

