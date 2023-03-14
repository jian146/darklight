import { Web3Provider } from '@ethersproject/providers'
import { ethers} from 'ethers'
import { getDltFarm } from '.'

/**
 * @description 质押
 * @param provider web3React Library
 * @returns Promise<ContractReceipt>
 */
export const stakeAbi=async (provider: Web3Provider, amount:number) => {
  try {
    const dktFarm = getDltFarm(provider)
    const res= await dktFarm.stake(ethers.utils.parseEther(amount+''))
    return res.wait()
  } catch (error) {
    console.error('质押异常', error)
    return Promise.reject(error)
  }

}
/**
 * @description 解除质押
 * @param provider web3React Library
 * @returns Promise<ContractReceipt>
 */
export const unstakeAbi=async (provider: Web3Provider, lastBlock:number, harvestBlock:ethers.BigNumber, harvestAmount:ethers.BigNumber, stakeIndexs:number[], signature:string) => {
  try {
    const dktFarm = getDltFarm(provider)
    const res= await dktFarm.unstake(lastBlock, harvestBlock, harvestAmount, stakeIndexs, signature)
    return res.wait()
  } catch (error) {
    console.error('解除质押异常', error)
    return Promise.reject(error)
  }

}
/**
 * @description 收菜
 * @param provider web3React Library
 * @returns Promise<ContractReceipt>
 */
export const harvestAbi=async (provider: Web3Provider, harvestBlock:ethers.BigNumber, harvestAmount:ethers.BigNumber, signature:string, address:string, lastBlock:number) => {
  try {
    const dktFarm = getDltFarm(provider)
    const res= await dktFarm.harvest(lastBlock, harvestBlock, harvestAmount, signature)
    return res.wait()
  } catch (error) {
    console.error('收菜异常', error)
    return Promise.reject(error)
  }

}
