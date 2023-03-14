import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BtnBack from 'src/assets/images/game/hero/btn_back.png'

const BackWrapper = styled.span`
  .back-title {
    color: #B2856C;
    font-size: 22px;
  }
`
interface I_Back{
  backCall?:()=>void
  className?:string
}
const Back: React.FC<I_Back> = (props:I_Back) => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const back = () => {
    if (props.backCall){
      props.backCall()
    } else {
      navigate(-1)
    }

  }

  return (
    <BackWrapper className={`flex mt-4 ml-3 md:ml-1 ${props?.className}`}>
      <span onClick={back} className='flex items-center cursor-pointer'>
        <img className='w-7' src={BtnBack} draggable="false" alt="" />
        <span className="back-title">
          {t('back')}
        </span>
      </span>
    </BackWrapper>
  )
}

export default Back
