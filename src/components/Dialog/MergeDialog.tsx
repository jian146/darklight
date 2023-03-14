import { ReactNode } from 'react'
import { ModalProps, notification, Spin } from 'antd'
import { RoleModal } from './style'
import closeImg from 'src/assets/images/dialog/role_dialog/close.png'
import dividerImg from 'src/assets/images/dialog/role_dialog/divider.png'
import arrowImg from 'src/assets/images/liquidity/arrow.png'
import Button from '../Button'

import { HeroType } from 'src/types/hero'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import roleContImg from 'src/assets/images/game/card/role_cont_img.png'
export interface HeroDialogProps extends ModalProps {
  id?: string,
  heros: HeroType[],
  loading?:boolean,
  content?: string | ReactNode,
  goldPrice:string
  dltPrice:string
}

const MergeDialog: React.FC<HeroDialogProps> = ({
  id = '',
  heros,
  content,
  goldPrice,
  dltPrice,
  ...props
}) => {
  const { t } = useTranslation()

  // 没有显示，渲染空
  if (!props.visible) return <></>
  const currentLv = heros[0].level??'1'
  if (!currentLv) {
    notification.error({
      message: 'Error',
      description: 'hero lvel doesn\'t exists'
    })
    return null
  }


  const getSuccessRate=() =>{
    //二合一
    if (heros.length ===2){
      return 100
    } else {
      let a=0
      heros.map((item)=>{
        a+=item.fatigue
        return item
      })
      return ((a/4800)*0.9*100).toFixed(2)


    }

  }
  return (
    <RoleModal
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
      <Spin spinning={props.loading}>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-end">
            <img
              className="w-6 h-6 cursor-pointer"
              src={closeImg}
              alt=""
              onClick={props.onCancel}
            />
          </div>
          <div className="hero-img mx-auto">
            <img
              className="h-full mx-auto"
              src={roleContImg}
              // src={hero.occupation !== undefined ? HeroImgList[hero.occupation] : ''}
              alt=""
            />
          </div>
          <div className="flex justify-center items-start mt-11">
            <div className="text-eaeaea text-xs">
              <div className="mb-4">LV.{currentLv}</div>
              <div className="mb-4">{t('game.heros.gold')}</div>
              <div className="mb-4">DLT</div>
              <div>{t('game.heros.successRate')}</div>
            </div>
            <img className="transform -rotate-90 mx-12" src={arrowImg} alt="" />
            <div className="text-thirdly text-xs">
              <div className="mb-4">
              LV.{heros.length ===2?1:currentLv + 1}
              </div>
              <div className="mb-4">
                { goldPrice}
              </div>
              <div className="mb-4">
                {dltPrice }
              </div>
              <div>
                {getSuccessRate()}%
              </div>
            </div>
          </div>
          <img className="mt-5" src={dividerImg} alt="" />

          <div className="text-898D96 w-9/12 mt-4 text-center">
            {content}
          </div>
          <div className="text-xs md:text-sm text-secondary w-1/2 ">
            {t('game.magic.magicInfo')}
          </div>
          <div className="my-7 relative">
            <Spin spinning={false} size="small">
              <Button
                width="186px"
                height="46px"
                fontSize="18px"
                bold
                img={btnRedBg}
                onClick={props.onOk}
              >
                {t('game.magic.magic')}
              </Button>


            </Spin>
          </div>
        </div>
      </Spin>
    </RoleModal>
  )
}

export default MergeDialog
