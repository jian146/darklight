import { DrawerProps } from 'antd'
import closeImg from 'src/assets/images/common/close.png'
import { Drawer } from './style'

type BottomDrawerProps = Omit<DrawerProps, 'placement' | 'destroyOnClose' | 'maskClosable'>

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  children,
  ...props
}) => {
  return (
    <Drawer
      placement="bottom"
      destroyOnClose={true}
      maskClosable={false}
      closeIcon={<img className="w-6" src={closeImg} alt='' />}
      {...props}
    >
      {children}
    </Drawer>
  )
}

export default BottomDrawer
