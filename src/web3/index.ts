import { BigNumber, Contract, ethers } from 'ethers'
import { HERO_ABI } from 'src/abis/hero'
import { Pve_ABI } from 'src/abis/pve'
import { DLT_ABI } from 'src/abis/dlt'
import { GOLD_ABI } from 'src/abis/gold'
import { Presale_ABI } from 'src/abis/presale'
import { Web3Provider } from '@ethersproject/providers'
import { JOB_ABI } from 'src/abis/job'
import { MARKET_ABI } from 'src/abis/market'
import { Key_ABI } from 'src/abis/key'
import { DLTFarm_ABI } from 'src/abis/dltFarm'
import { DLC_ABI } from 'src/abis/dlc'
import { Equip_ABI } from '../abis/equip'
import { MARKET_EQUIP_ABI } from 'src/abis/equipMarket'
import { Pvp_ABI } from 'src/abis/pvp'


export const HERO_ADDRESS = process.env.REACT_APP_HERO_ADDR || ''
export const OLDHERO_ADDRESS = process.env.REACT_APP_OLDHERO_ADDR || ''
export const DLT_ADDRESS = process.env.REACT_APP_DLT_ADDR || ''
export const Presale_ADDR = process.env.REACT_APP_PRESALE_ADDR || ''
export const GOLD_ADDRESS = process.env.REACT_APP_GOLD_ADDR || ''
export const JOB_ADDRESS = process.env.REACT_APP_JOB_ADDR || ''
export const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDR || ''
export const MARKET_EQUIP_ADDRESS = process.env.REACT_APP_MARKET_EQUIP_ADDR || ''
export const Pve_ADDRESS = process.env.REACT_APP_PVE_ADDR || ''
export const Pvp_ADDRESS = process.env.REACT_APP_PVP_ADDR || ''
export const Key_ADDRESS = process.env.REACT_APP_KEY_ADDR || ''
export const DLTFarm_ADDRESS = process.env.REACT_APP_DLTFarm_ADDR || ''
export const LP_ADDRESS=process.env.REACT_APP_DLT_YTSD_LP || ''
export const DLC_ADDRESS = process.env.REACT_APP_DLC_ADDR || ''
export const Equip_ADDRESS= process.env.REACT_APP_EQUIP_ADDR || ''

export const getDlt = (provider: Web3Provider): Contract => (
  new ethers.Contract(DLT_ADDRESS, DLT_ABI, provider.getSigner())
)
export const getDlc = (provider: Web3Provider): Contract => (
  new ethers.Contract(DLC_ADDRESS, DLC_ABI, provider.getSigner())
)
export const getHero = (provider: Web3Provider): Contract => (
  new ethers.Contract(HERO_ADDRESS, HERO_ABI, provider.getSigner())
)
export const getOldHero = (provider: Web3Provider): Contract => (
  new ethers.Contract(OLDHERO_ADDRESS, HERO_ABI, provider.getSigner())
)
export const getPresale = (provider: Web3Provider): Contract => (
  new ethers.Contract(Presale_ADDR, Presale_ABI, provider.getSigner())
)

export const getGold = (provider: Web3Provider): Contract => (
  new ethers.Contract(GOLD_ADDRESS, GOLD_ABI, provider.getSigner())
)

export const getJob = (provider: Web3Provider): Contract => (
  new ethers.Contract(JOB_ADDRESS, JOB_ABI, provider.getSigner())
)

export const getMarket = (provider: Web3Provider): Contract => (
  new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider.getSigner())
)
export const getMarketEquip = (provider: Web3Provider): Contract => (
  new ethers.Contract(MARKET_EQUIP_ADDRESS, MARKET_EQUIP_ABI, provider.getSigner())
)


export const getPve= (provider: Web3Provider): Contract => (
  new ethers.Contract(Pve_ADDRESS, Pve_ABI, provider.getSigner())
)
export const getPvp= (provider: Web3Provider): Contract => (
  new ethers.Contract(Pvp_ADDRESS, Pvp_ABI, provider.getSigner())
)
export const getKey= (provider: Web3Provider): Contract => (
  new ethers.Contract(Key_ADDRESS, Key_ABI, provider.getSigner())
)
export const getDltFarm= (provider: Web3Provider): Contract => (
  new ethers.Contract(DLTFarm_ADDRESS, DLTFarm_ABI, provider.getSigner())
)
export const getLP= (provider: Web3Provider): Contract => (
  new ethers.Contract(LP_ADDRESS, GOLD_ABI, provider.getSigner())
)
export const getEquip= (provider: Web3Provider): Contract => (
  new ethers.Contract(Equip_ADDRESS, Equip_ABI, provider.getSigner())
)

type T_approvTarget='hero' | 'market'|'pve' |'key'|'equip'|'marketEquip'|'pvp'
const getAddressByTarge=(target:T_approvTarget)=>{
  let addr=HERO_ADDRESS
  if (target === 'hero' ){
    addr=HERO_ADDRESS
  } else if (target === 'market'){
    addr=MARKET_ADDRESS
  } else if (target === 'pve'){
    addr=Pve_ADDRESS
  } else if (target === 'key'){
    addr=Key_ADDRESS
  } else if (target === 'equip'){
    addr=Equip_ADDRESS
  } else if (target === 'marketEquip'){
    addr=MARKET_EQUIP_ADDRESS
  } else if (target === 'pvp'){
    addr=Pvp_ADDRESS
  } else {
    addr=HERO_ADDRESS
  }
  return addr
}

/**
 * @description 查询 dlt 授权
 * @param provider web3React Library
 * @param account 账户
 * @param target 授权对象
 * @returns Promise<ethers.BigNumber>
 */
export const queryApproveDLT = async (
  provider: Web3Provider,
  account: string,
  target: T_approvTarget= 'hero'
): Promise<ethers.BigNumber> => {
  const dlt = getDlt(provider)
  const addr = getAddressByTarge(target)
  const allowValue = await dlt.allowance(account, addr)
  return allowValue
}

/**
 * @description 查询 dlc 授权
 * @param provider web3React Library
 * @param account 账户
 * @param target 授权对象
 * @returns Promise<ethers.BigNumber>
 */
export const queryApproveDLC = async (
  provider: Web3Provider,
  account: string,
  target: T_approvTarget= 'hero'
): Promise<ethers.BigNumber> => {
  const dlc = getDlc(provider)
  const addr = getAddressByTarge(target)
  const allowValue = await dlc.allowance(account, addr)
  return allowValue
}


/**
 * @description 授权 dlt
 * @param provider web3React Library
 * @param target 授权对象
 * @param amount 授权 BNB 的数量
 */
export const approveDLT = async (
  provider: Web3Provider,
  target: T_approvTarget = 'hero',
  amount: ethers.BigNumber = BigNumber.from(ethers.constants.MaxUint256),
) => {
  const dlt = getDlt(provider)
  const addr = getAddressByTarge(target)
  const tx= await dlt.approve(addr, amount)
  return await tx.wait()
}

/**
 * @description 授权 dlc
 * @param provider web3React Library
 * @param target 授权对象
 * @param amount 授权 BNB 的数量
 */
export const approveDLC = async (
  provider: Web3Provider,
  target: T_approvTarget = 'hero',
  amount: ethers.BigNumber = BigNumber.from(ethers.constants.MaxUint256),
) => {
  const dlc = getDlc(provider)
  const addr = getAddressByTarge(target)
  const tx =await dlc.approve(addr, amount)
  return await tx.wait()
}

/**
 * @description 查询 gold 授权
 * @param provider web3React Library
 * @param account 账户
 * @returns Promise<ethers.BigNumber>
 */
export const queryApproveGold = async (provider: Web3Provider, account: string, target: T_approvTarget = 'hero'): Promise<ethers.BigNumber> => {
  const gold = getGold(provider)
  const addr = getAddressByTarge(target)
  try {
    return await gold.allowance(account, addr)
  } catch (error) {
    console.error('授权'+target+'金币失败', error)
    return Promise.reject(error)
  }

}
/**
 * @description 查询 gold 并授权
 * @param provider web3React Library
 * @param account 账户
 * @returns Promise<ethers.BigNumber>
 */
export const queryAndApprove = async (provider: Web3Provider, account: string, target: T_approvTarget = 'hero', type='gold'): Promise<boolean> => {

  try {
    let res
    if (type==='gold'){
      res= await queryApproveGold(provider, account, target)
    } else if (type==='dlc'){
      res= await queryApproveDLC(provider, account, target)
    } else {
      res= await queryApproveDLT(provider, account, target)
    }

    if (res.lte(ethers.utils.parseEther('1'))) {
      //未授权
      let backRes
      if (type==='gold'){
        backRes= await approveGlod(provider, target)
      } else if (type==='dlc'){
        backRes= await approveDLC(provider, target)
      } else {
        backRes= await approveDLT(provider, target)
      }
      if (backRes){
        return true
      }
      return false
    } else {
      //已授权
      return true
    }

  } catch (error) {
    console.error('查询并授权'+(target+type==='gold'?'金币':'dlt')+'失败', error)
    return false
  }

}
/**
 * @description 授权金币
 * @param provider web3React Library
 * @param amount 授权 gold 的数量
 */
export const approveGlod = async (
  provider: Web3Provider,
  target: T_approvTarget= 'hero',
  amount: ethers.BigNumber = BigNumber.from(ethers.constants.MaxUint256)
) => {
  const gold = getGold(provider)
  const addr = getAddressByTarge(target)
  const tx= await gold.approve(addr, amount)
  return await tx.wait()
}
/**
 * @description 授权lp给DltFarm
 * @param provider web3React Library
 * @param amount 授权 gold 的数量
 */
export const approveDltFarm= async (
  provider: Web3Provider,
  amount: ethers.BigNumber = BigNumber.from(ethers.constants.MaxUint256)
) => {
  const Lp = getLP(provider)
  const addr = DLTFarm_ADDRESS
  return await Lp.approve(addr, amount)

}

/**
 * @description 查询 LP 授权
 * @param provider web3React Library
 * @param account account
 */
export const queryLp= async (
  provider: Web3Provider,
  account: string
) => {
  const Lp = getLP(provider)
  return await Lp.allowance(account, DLTFarm_ADDRESS)
}


/**
 * @description 查询 dlt 授权
 * @param provider web3React Library
 * @param account 账户
 * @param target 授权对象
 * @returns Promise<ethers.BigNumber>
 */


/**
 * @description 查询 NFT 授权
 * @param provider web3React Library
 * @param account account
 */
export const queryApproveNft = async (
  provider: Web3Provider,
  account: string
): Promise<boolean> => {
  const hero = getHero(provider)
  return await hero.isApprovedForAll(account, MARKET_ADDRESS)
}

/**
 * @description 授权 NFT
 * @param provider web3React Library
 */
export const approveNtf = async (provider: Web3Provider) => {
  const hero = getHero(provider)
  await hero.setApprovalForAll(MARKET_ADDRESS, true)
}

export const checkDlt=async (provider: Web3Provider, c_dlt:number): Promise<boolean> => {
  return await comCheck(provider, c_dlt, 1)
}
export const checkGold=async (provider: Web3Provider, c_gold:number): Promise<boolean> => {
  return await comCheck(provider, c_gold, 2)
}
export const checkDlc=async (provider: Web3Provider, c_dlc:number): Promise<boolean> => {
  return await comCheck(provider, c_dlc, 3)
}
/**
 * glt和gold余额对比
 * @param provider 授权
 * @param checkPrice 要对比的价格
 * @param type 类别 1:Dlt  2:gold 1:Dlc
 * @returns 大小 ture为余额充足
 */
export const comCheck=async (provider: Web3Provider, checkPrice:number, type=1): Promise<boolean> => {
  try {
    const address =await provider.getSigner().getAddress()
    let providerObj
    if (type===1){
      providerObj=getDlt(provider)
    } else if (type===2){
      providerObj= getGold(provider)
    } else if (type===3){
      providerObj= getDlc(provider)
    } else {
      providerObj= getDlt(provider)
    }
    const priceBalance=await providerObj.balanceOf(address)
    const bignumber_checkPrice=ethers.utils.parseEther(`${checkPrice}`)
    return priceBalance.gte(bignumber_checkPrice)
  } catch (error) {
    console.error('检查数量'+checkPrice+'检查类型:'+type, ' 1:Dlt  2:gold 3:Dlc')
    return Promise.reject(error)
  }

}
