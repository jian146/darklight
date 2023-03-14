import styled from '@emotion/styled'
import pathBg from 'src/assets/images/index/path_bg.jpg'
import saleBg from 'src/assets/images/presale/sele_bg.png'
import inputBg from 'src/assets/images/presale/input-bg.png'

type type = {
  stateColor: 'red' | 'green'
}
export const PresaleWrapper = styled.div<type>`
  width: 100%;
  background: url(${pathBg}) no-repeat;
  background-size: 100% 100%;
  border-top: 1px solid transparent;
  color: #220D02;

  .presale {
    width: 100%;
    max-width: 1247px;
    min-height: 1253px;

    .presale-content {
      width: 100%;
      padding: 0 30px 0 64px;
      background: url(${saleBg}) no-repeat center;
      background-size: 100% 100%;

      .left {
        flex: 2;
        .status {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 18px;
          background: rgba(0, 0, 0, .4);
          color: ${({ stateColor }) => stateColor === 'red' ? '#fff' : '#58e734'};
          padding: 4px 10px 4px 22px;
          position: relative;
          font-size: 12px;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${({ stateColor }) => stateColor === 'red' ? '#C92D16' : '#58e734'};
            position: absolute;
            top: 50%;
            left: 8px;
            transform: translateY(-50%);
          }
        }
        .list {
          .item {
            padding: 15px 0;
            color: #220D02;
            font-size: 14px;
            border-bottom: 1px solid #8d7660;
            font-size: 12px;
          }
        } 
      }
      .right {
        flex: 1;

        .ant-progress-inner {
          background-color: #160E0E;
          border: 1px solid #6B594D;
          border-radius: 4px;
        }
        .ant-progress-bg {
          height: 14px !important;
          border-radius: 4px;
          background: linear-gradient(90deg, #610C0E, #7D181B, #610C0E)
        }

        .es-button {
          width: 158px;
          height: 40px;
        }

        .i-bd {
          border-bottom: 1px solid #8d7660;
          padding: 15px 0;
        }

        .sale-input {
          height: 40px;
          background: url(${inputBg}) no-repeat;
          background-size: 100% 100%;
          padding: 0 10px;

          input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
          }
        }
      }
    }

    @media screen and (max-width: 480px) {
      padding: 0 10px;
      
      .presale-content {
        padding: 0 30px;

        .left {
          .logo {
            width: 38px;
            height: 38px;
          }

          .l-title {
            flex-direction: column-reverse;
            align-items: flex-start;
            > p {
              font-size: 18px;
            }

            > span {
              width: 100%;
              display: flex;
              justify-content: flex-start;
            }
          }
        }
        
        .right {
          margin-top: 40px;
          margin-left: 0;
          width: 100%;

          .m {
            width: 100%;
          }
        }
      }
    }
  }
`
