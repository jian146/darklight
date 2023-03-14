import styled from '@emotion/styled'


export const BoxItemWrapper = styled.div`
  display:flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width:435px;
  // background-color:rgb(31,17,15);
 
  padding-top:45px;
  padding-bottom:35px;
  box-sizing: border-box;
  line-height:1;

  .count{    
    font-size: 24px;
    font-weight:bold;
    color: #D68C3F;
    margin-top:32px;
  }
  .tramsferImg{
    margin-top:26px;
    margin-bottom:23px;
  }
  @media screen and (max-width: 768px) {
    width:90vw;
    margin-bottom:20px;
    padding-top:25px;
  }
`
