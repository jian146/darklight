import styled from '@emotion/styled'
import bg from 'src/assets/images/game/magic/bg.png'
import mbg from 'src/assets/images/game/magic/mbg2.png'
import addbg from 'src/assets/images/game/magic/add_bg.png'
import selectbg from 'src/assets/images/game/magic/select_bg.png'
import centerBg from 'src/assets/images/game/magic/cneter_bg.png'
import newCardBg from 'src/assets/images/game/magic/new_card_bg.png'

export const MagicWrapper = styled.div`
#heroDrawler{
  .ant-modal-mask{
    background-color: rgba(0, 0, 0, 0.85);
  }
  .ant-modal-content {
    .heroContent{
      height:auto;
      min-height:auto;
      justify-content: center;
    }
    .leftBtn{
      margin-right:0px;
    }
    .rightBtn{
      display:none;
    }
  }
}
@media screen and (max-width: 768px) {
  #heroDrawler{
    .ant-modal-content {
      .heroContent{
        height:auto;
        display:flex !important;
        min-height:auto;
      
        justify-content: center;
      }
    }
  }
}
  .wrapper {
    max-width: 620px;
    width: 100%;
    padding-bottom: 96px;
    background: url(${bg}) no-repeat center;
    background-size: 100% 100%;
    border-top: 1px solid transparent;

    .center {
      max-width: 191px;
      width: 37%;
      max-height: 191px;
      height: 37%;
      background: url(${centerBg}) no-repeat center;
      background-size: 100% 100%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;

      &.new {
        background: url(${newCardBg}) no-repeat center;
        background-size: 100% 100%;
      }
    }

    .magic-select {
      max-width: 103px;
      min-width: 50px;
      width: 20%;
      max-height: 200px;
      min-height: 50px;
      height: 21%;
      background: url(${addbg}) no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
      
      &.selected {
        background: url(${selectbg}) no-repeat center;
        background-size: 100% 100%;

        > img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1
        }
      }

      .select-hero {
        width: 100%;
        height: 100%;
      }

      .ant-dropdown-menu {
        background-color: #2b2624;

        .ant-dropdown-menu-item:hover,
        .ant-dropdown-menu-submenu-title:hover {
          background-color: #2b2624;
        }
      }
    }

  }

  @media screen and (max-width: 480px) {
    .en-h5{
      margin-top:30px;
    }
    .h5Chose{
      // width:calc(100vw - 20px);
    }
    .wrapper {
      width: 90%;
      height: 724px;
      background: url(${mbg}) no-repeat center;
      background-size: 100% 100%;

      .es-button {
        height: 38px;
        width: 126px;
        span {
          font-size: 12px;
        }
      }
    }
    
  }
`
