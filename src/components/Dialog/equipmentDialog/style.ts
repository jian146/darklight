import styled from '@emotion/styled'
import { Modal } from 'antd'
import equipmentBg from 'src/assets/images/game/backpack/popover.png'

export const EquipmentModalStyle = styled(Modal)`
.ant-modal-content {
  background: url(${equipmentBg}) no-repeat;
  background-size: 100% 100%;
  .ant-modal-body{
    padding:60px 26px 24px 30px;
    .info{      
      color: #482D2D;
      display:flex;
      .leftInfo{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right:50px;
        .img{
          width:120px;
          height:120px;
          // border:1px solid #e2e2e2;
        }
        .btnRow{
          .btn{
            margin-bottom:20px;
            
          }
          margin-bottom:60px;
        }
       
      }
      .titleRow{
        display:flex;
        algin-items:center;
        position: relative;
        .name{        
          font-size: 18px;
          margin-right:11px;
          font-weight:bold;
          .subName{
            font-size:16px;
            margin-left:4px;
          }
        }
        .closeIcon{
          position: absolute;
          right:0;
        }
      }
      .infoRow{        
        display: flex;
        align-items: center;
        margin-bottom:16px;
        font-weight:500;
        .infoRowItem{
          width:50%;
          .classItem{
            margin-right:5px;
          }
        }        
      }
      .attrRow{
        padding:0px 0 15px 0;
        .addColor{
          color: #ecae18;
        }
        .at-item{
          width:50%;
          min-width:50%;
          display: flex;
          align-items: center;
          margin-bottom:20px;
          font-weight:500;
          .text{
            margin-left:8px;
            display:flex;
            justify-content:space-between;
            padding-right:48px;
            width:100%;
          }
        }
        .attr-top,.attr-bottom{
          border-top:1px solid rgba(112,88,75,0.3);
          padding-top:16px;
          display:flex;
          flex-wrap: wrap;
        }
      }
      .label{
        color: #6E5549;
      }
    }
  }
  
 
   
}
@media screen and (max-width: 768px) {  
  .ant-modal-content{
    .ant-modal-body{
      padding:60px 13px 24px 15px;
      .info{
        .leftInfo{
          position: absolute;
          width: 100%;
          height: 100%;
          padding-right:0px;
          .box{
            width:90px !important;
            height:90px !important; 
          }
          .img{
            width:90px;
            height:90px;
          }
          .btnRow{
            width:90%;
            display:flex;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform:translate(-50%,0%);
            align-items:center;
            justify-content: center;
            margin-left:-14px;
            .btn{
              &:nth-of-type(2){
                margin-left:10px;
              }
            }
          }
        }
        .rightInfo{
          padding-bottom:50px;
          .attrRow{
            padding:0 15px;
            .at-item{
              .text{
                margin-left:4px;
                padding-right:20px
                // padding-right:24px;
              }
            }
          }
          .titleRow,.infoRow{
            padding-left:100px;
            .starBox{
              .starItem{
                width:12px;
                height:12px;
              }
            }
          }
        }
      }
    }
  }
  
}
`
