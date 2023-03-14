import styled from '@emotion/styled'
import advBg from 'src/assets/images/game/adventure/adv_bg.png'
export const AdventureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {

    .pve-container{
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 800;
      background-color: #0C0909;
      .clossBack{
        position: absolute;
        z-index: 800;
        left: 50%;
        top: 20px;
        transform: rotate(90deg);
        .back-title{
          display:none !important;
        }
      }
    }
  }

  .record {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    margin: 40px 35px 25px 0;

    span {
      margin-left: 8px;
      font-size: 18px;
      text-decoration: underline;
      color: #B2856C;
    }
  }

  .advmap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
  
    @media screen and (max-width: 1116px) {
      padding: 0 100px;
    }
  
    @media screen and (max-width: 930px) {
      justify-content: center;
    }
  
  
    .box {
      width: 366px;
      height: 547px;
      background: url(${advBg}) no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
  
      .index {
        color: #260D0F;
        font-size: 18px;
        font-weight: bold;
        margin-top: 28px;
        font-style: normal;
      }
  
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #BAA694;
        margin-top: 14px;
      }
  
      img {
        margin-top: 30px;
      }
  
      .desc {
        text-align: center;
        margin-top: 40px;
  
        .desc-level {
          font-size: 16px;
          font-weight: bold;
          color: #D68C3F;
          margin-bottom: 12px;
        }
  
        .desc-cont {
          max-width: 281px;
          font-size: 14px;
          font-weight: 400;
          color: #BAA694;
        }
      }
  
      .es-button {
        margin-top: 18px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .record {
      justify-content: center;
    }

    .advmap {
      padding: 0 10px;
    }
  }
`
