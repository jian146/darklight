import styled from '@emotion/styled'
import rewardbg from 'src/assets/images/mine_detail/reward_bg.png'
import lineSelect from 'src/assets/images/mine_detail/line_select.png'
import heroBg from 'src/assets/images/game/hero/Hero-bg.png'

export const MineDetailWrapper = styled.div`
  .top {
    border: 1px solid #BAA694;

    .title {
      transform: translateX(-50%);

      > span {
        transform: translate(-50%, -50%);
      }
    }

    .decorator {
      &:nth-of-type(2) {
        transform: rotate(90deg);
      }
      &:nth-of-type(3) {
        transform: rotate(180deg);
      }
      &:nth-of-type(5) {
        transform: rotate(270deg);
      }
    }

    .award {
      width: calc(100% - 48px);
      height: 33px;
      background: url(${rewardbg}) no-repeat center;
      background-size: 100% 100%;

      @media screen and (min-width: 768px) {
        width: 240px;
      }
    }

    .mselect {
      transform: translateY(-50%);
      width: calc(100% - 48px);
    }

    .select {
      transform: translate(-50%, -50%);

      .ant-dropdown-menu {
        background-color: #2b2624;

        .ant-dropdown-menu-item:hover,
        .ant-dropdown-menu-submenu-title:hover {
          background-color: #2b2624;
        }
      }

      .chose-hero {
        position: relative;
        width: 275px;
        height: 48px;
        line-height: 48px;
        text-align: center;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          background: url(${lineSelect}) no-repeat;
          background-size: 100% 100%;
          width: 275px;
          height: 1px;
        }
        &::after {
          position: absolute;
          left: 0;
          bottom: 0;
          content: "";
          background: url(${lineSelect}) no-repeat;
          background-size: 100% 100%;
          width: 275px;
          height: 1px;
        }
      }
    }

    .btn {
      transform: translate(-50%, -50%);
    }
  }
  .btn-checkRow{
    .btnBox{
      .left-btn{
        margin-right:15px;
      }
  
    }
  }

  @media screen and (max-width: 768px) {
    .editRow{
      margin-top:5px;
      flex-wrap:wrap;
      .left-text{
        width:100%;
        margin-bottom:10px;
      }
    }
    
    .btn-checkRow{
      .btnBox{
        justify-content: end;
        .left-btn{
          margin-right:0px;
          margin-bottom:5px;
        }
      }
  
    }

    
  }
  .work-list {
    border-color: #BAA694;
    border-radius: 8px;
    background: #171212;

    .primary {
      color: #ecae18;
    }

    .wl-item {
      .hero-avatar {
        width: 52px;
        height: 52px;
        flex-shrink: 0;
        background: url(${heroBg}) no-repeat;
        background-size: 100% 100%;

        > img {
          max-height: 90%;
        }
      }
    }
  }
`
