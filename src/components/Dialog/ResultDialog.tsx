import React from 'react'
import { ModalProps } from 'antd'
import { ResultModal } from './style'
import successImg from 'src/assets/images/dialog/result_dialog/success.png'
import failImg from 'src/assets/images/dialog/result_dialog/fail.png'
import Button from '../Button'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import { useTranslation } from 'react-i18next'

export interface ResultDialogProps extends ModalProps {
  type?: 'success' | 'fail'|undefined,
  title?: string|React.ReactNode
  content?: string | React.ReactNode
  onOk?:()=>void
  onCancel:()=>void
  id?:string
}

const ResultDialog: React.FC<ResultDialogProps> = ({ type, content, title, onOk, onCancel, id='', ...props }) => {

  const { t } = useTranslation()

  return (
    <ResultModal
      centered
      destroyOnClose
      footer={null}
      closable={false}
      getContainer={() => document.getElementById(id) || document.body}
      {...props}
    >
      <div className="overflow-hidden flex flex-col justify-start items-center">
        {
          type&&<img
            className="max-w-full transform scale-150 md:scale-100"
            src={type === 'success' ? successImg : failImg}
            alt=""
          />
        }
        {title&&title}

        <div className="content text-xl md:text-2xl mt-5 md:mt-0 mb-14 flex
                        items-start text-center justify-center">
          { content }
        </div>
        <Button
          width="186px"
          height="46px"
          fontSize="18px"
          bold
          img={btnRedBg}
          className="h-10"
          onClick={()=>{ onOk?onOk():onCancel() }}
        >
          {t('back')}
        </Button>
      </div>
    </ResultModal>
  )
}

export default ResultDialog
