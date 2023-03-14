import { HeroType } from 'src/types/hero'

import { PVEModalStyle } from './style'
interface I_pveModal{
    visible:boolean;
    selectHero:HeroType|undefined;

}
const PVEModal=(props:I_pveModal)=>{

  return <PVEModalStyle

    width={1600}
    title={null}
    centered
    maskClosable={false}
    destroyOnClose
    closable={false}
    footer={null}
    {...props}
  >
    {/* <PVE selectHero={props.selectHero} /> */}

  </PVEModalStyle>
}

export default PVEModal
