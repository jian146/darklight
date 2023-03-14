import { ReactNode, useState } from 'react'
import { message, ModalProps, notification, Spin } from 'antd'
import { RoleModal } from './style'
import closeImg from 'src/assets/images/dialog/role_dialog/close.png'
import dividerImg from 'src/assets/images/dialog/role_dialog/divider.png'
import arrowImg from 'src/assets/images/liquidity/arrow.png'
import Button from '../Button'
import { HeroImgList, HeroUpgradeConfig } from 'src/config'
import { HeroType, LevelType, Occupations } from 'src/types/hero'
import { useTranslation } from 'react-i18next'
import btnRedBg from 'src/assets/images/common/btn_red.png'
import Radio from '../Radio'
import { checkDlt, checkGold, queryAndApprove } from 'src/web3'
import { useWeb3React } from '@web3-react/core'

export interface HeroDialogProps extends ModalProps {
  id?: string,
  hero: Partial<HeroType>,
  content?: string | ReactNode,
  type?: 'upgrade' | 'downgrade',
  onOk?: (isUseSafe: boolean | any) => void
}

const HeroDialog: React.FC<HeroDialogProps> = ({
  id = '',
  hero,
  content,
  type,
  ...props
}) => {
  const { t } = useTranslation()
  const { library, account } = useWeb3React()
  const [isUseSafe, setIsUseSafe] = useState(false)
  // 没有显示，渲染空
  if (!props.visible) return <></>
  const currentLv = hero.level
  if (!currentLv) {
    notification.error({
      message: 'Error',
      description: 'hero lvel doesn\'t exists'
    })
    return null
  }
  //是否使用保险

  const targetLv = ('lv' + (currentLv + 1)) as LevelType
  const target = HeroUpgradeConfig[targetLv]
  //保险升级价格配置  包括了原本的费用
  const SafePriceConfig=[
    [
      23000, 57500, 172500, 522000, 1455000, 2910000, 7800000, 17200000, 31700000, 84100000, 171500000
    ],
    [
      0, 0, 0, 5000, 50000, 100000, 500000, 1000000, 1000000, 2000000, 5000000
    ]
  ]
  //保险价格
  const goldPrice = isUseSafe ? SafePriceConfig[0][currentLv-1] : target.gold
  const dltPrice = isUseSafe ? SafePriceConfig[1][currentLv-1] : target.dlt

  const checkPrice=async()=>{
    if (dltPrice!==0&&!await checkDlt(library, dltPrice)){
      message.info(t('message.DLT_Insufficient'))
      return
    }
    if (goldPrice!==0&&!await checkGold(library, goldPrice)){
      message.info(t('message.gold_Insufficient'))
      return
    }
    //判断是否授权
    if (account){
      const goldIsPass=await queryAndApprove(library, account, 'hero', 'gold')
      if (goldIsPass) {
        // message.success(t('message.AuthorizationSuccessful'))
      } else {
        //授权失败
        message.warn(t('message.privilegeGrantFailed'))
        return
      }
      const dltIsPass=await queryAndApprove(library, account, 'hero', 'dlt')
      if (dltIsPass) {
        // message.success(t('message.AuthorizationSuccessful'))
      } else {
        //授权失败
        message.warn(t('message.privilegeGrantFailed'))
        return
      }
    }
    props.onOk && props.onOk(isUseSafe)
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
            style={{ marginLeft: hero.occupation === Occupations.assassin ? -18 : 0 }}
            src={hero.occupation !== undefined ? HeroImgList[hero.occupation] : ''}
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
              LV.{type === 'upgrade' ? currentLv + 1 : currentLv - 1}
            </div>
            <div className="mb-4">
              {type === 'upgrade' ? hero.newbie ? (goldPrice / 10 ) : goldPrice:0}
            </div>
            <div className="mb-4">
              {type === 'upgrade' ? hero.newbie ? (dltPrice / 10) :dltPrice : 0}
            </div>
            <div>
              {type === 'upgrade' ? target.successRate : '100%'}
            </div>
          </div>
        </div>
        <img className="mt-5" src={dividerImg} alt="" />
        {
          type === 'upgrade' && <div
            className="flex justify-center items-start mt-2"
            style={{
              width: 175

              // transform: 'translate(100%,50%)',
              // paddingLeft: 10
            }}
          >
            <Radio
              boxClassName="radioColor w-full "
              boxStyle={{
                justifyContent: 'space-between',
                marginRight: 0,
                flexDirection: 'row-reverse'

              }}
              size={25}
              lable={t('game.magic.purchaseInsurance')}
              value={isUseSafe}
              onChange={(isCheck: boolean) => {
                setIsUseSafe(!isUseSafe)
              }}
            />
          </div>
        }
        <div className="text-898D96 w-9/12 mt-4 text-center">
          {content}
        </div>
        <div className="my-7 relative">
          <Spin spinning={false} size="small">
            <Button
              width="186px"
              height="46px"
              fontSize="18px"
              bold
              img={btnRedBg}
              onClick={() => { checkPrice() }}
            >
              {
                type === 'upgrade' ?
                  t('game.heros.upgrade') :
                  t('game.heros.downgrade')
              }
            </Button>


          </Spin>
        </div>
      </div>
    </RoleModal>
  )
}

export default HeroDialog
