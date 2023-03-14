import styled from '@emotion/styled'

export const NtfWrapper = styled.div`
  max-width: 1256px;

  .no-radius {
    > label {
      border-radius: 0 !important;
    }
  }
  
  .no-border {
    > label {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }
  }

  .color-664F42 {
    color: #664F42;
  }

  .divider {
    background-color: #514031;
  }

  .color-B2856C {
    color: #B2856C;
  }

  .bd-col-514031 {
    border-color: #514031;
    background-color: #171212;
  }

  #selectsort {
    label {
      color: #B2856C;
      font-size: 18px;
      margin-right: 18px;
      font-weight: 700;
    }
    .ant-select-dropdown {
      background-color: #2C2624;
    }
    

    .ant-select-item {
      color: #B2856C;
      font-size: 16px;
      &:hover {
        background-color: #2C2624 !important;
      }
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: #2C2624;
      color: #B2856C;
    }

    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: #2C2624;
    }

    .ant-select-selection-placeholder {
      line-height: 38px;
      color: #B2856C;
      font-size: 16px;
      font-weight: bold;
    }
  }
  

  .select-sort {
    min-width: 140px;

    .ant-select-selector {
      background-color: #0C0909;
      border: 1px solid #664F42 !important;
      box-shadow: none !important;
      height: 40px;
      border-radius: 0;

      .ant-select-selection-item {
        line-height: 40px;
        color: #B2856C;
        font-size: 18px;
        font-weight: 700;
      }
    }

    .ant-select-arrow {
      color: #B2856C;
    }
  }
  .radioRow{
    label{
      min-width:32px;
    }
    .categoryRow{
      .ant-radio-button-wrapper{
        margin-bottom:5px;
        span{
          white-space: nowrap;
        }
      }
    }
    
  }

  @media screen and (max-width: 768px) {
    .bd-col-514031 {
      background-color: unset;
    }

    #selectsort {
      width: 100%;
    }

    .select-sort {
      width: 100%;
    }
  }

`
