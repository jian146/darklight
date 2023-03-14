import styled from '@emotion/styled'

export const LogPageStyle = styled.div`
.messageInfo{
    color: #B2856C;
    padding: 24px 24px;
    background: #171212;
    margin-top: 20px;
}
.logBox{
   padding-top:24px;
    .logRowItem{
        display:flex;
        color: #B2856C;
        font-size:16px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 24px 24px;
        background: #171212;
        margin-bottom: 20px;
        .equipBox{
            display:flex;
            align-items: center;
        }
        .attrItem{
            white-space:nowrap;
        }
        .equipImg{
            margin-right:20px;
            .box{
                width:80px !important;
                height:80px !important;
            }
        }
        .equipAttr{
            min-width:210px;
            margin-right:24px;
            .name{
                font-size: 18px;
                font-weight: bold;
            }
        }
        .line{
            border-right:1px solid #2E241E;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
        }
        .forgeLv{
            padding:0 24px;
            min-width:160px;
            border-left:1px solid #2E241E;

        }
        .forgeTime{
            padding:0 24px;
            min-width:185px;
        }
        .forgeBtnRow{
            width:100%;
            display:flex;
            align-items: center;
            justify-content:end;
        }
    }

}
@media screen and (max-width: 768px) {
    .logBox{

         .logRowItem{
             flex-wrap: wrap;
             .attrBox{
                 display:flex;
                 flex-wrap:wrap;
             }
             .equipBox{
                 margin-bottom:20px;
             }
             .line{
                border:none;
             }
             .equipAttr{
                 margin-right:0px;
             }
             .forgeLv{
                border-left:none; 
                border-right:1px solid #2E241E;
                padding:0px;
                padding-right:10px;
                min-width:auto;
             }
             .forgeBtnRow{
                 padding-top:20px;
                justify-content:center;
             }
             .forgeTime {
                 padding:0px;
                 min-width:150;
                 margin-left:10px;
             }
         }
    }
}
`
