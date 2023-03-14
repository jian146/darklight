import styled from '@emotion/styled'
import { Modal } from 'antd'
import HeroDialogBg from 'src/assets/images/dialog/role_dialog/bg.png'

export const ConfirmModel = styled(Modal)`
.ant-modal-content {
  background: url(${HeroDialogBg}) no-repeat;
  background-size: 100% 100%;
  .row{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .titleText{
    font-family: FZLanTingHei-B-GBK;
    font-weight: bold;    
    color: #BAA694;
    font-size: 36px;
  }
  .initMessage{
    color:#BAA694;    
    font-size: 20px;    
    line-height: 36px;
    padding:45px 0;
  }
  .btnRow{
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  .inputClass{
    background: rgba(12, 9, 8, 0.49);
    border: 1px solid #281E18;
    border-radius: 2px;
    font-size: 18px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
    color: #664F42;
    margin: 28px 0;
    ::-webkit-input-placeholder{
      color:red;
      font-size: 10px;
      font-family: FZLanTingHei-R-GBK;
      font-weight: 400;
      color: #664F42;
  }
    // line-height: 70px;
  }
}
`
