import { Menu } from 'antd'
import scrollTopImg from 'src/assets/images/game/scroll-top.png'
import scrollBottomImg from 'src/assets/images/game/scroll-bottom.png'
import styled from '@emotion/styled'

export const DropdownMenu = styled(Menu)`
  max-height: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-button:start:decrement {
    display: block;
    background: url(${scrollTopImg}) no-repeat;
  }
  &::-webkit-scrollbar-button:end:increment {
    display: block;
    background: url(${scrollBottomImg}) no-repeat;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2b2624;
    border-radius: 4px;
  }
`
export const DropdownMenuItem = styled(Menu.Item)`
  margin: 0 10px;
`
