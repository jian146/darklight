import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { errorLog } from 'src/utils/log'
import { getMarketEquip } from '.'

/**
 * @description 售卖装备,上架
 */
export const sellEquipAbi = async (
  provider: Web3Provider,
  tokenId: string,
  price: string
) => {
  try {
    const market = getMarketEquip(provider)
    const value = ethers.utils.parseEther(price)
    const result = await market.sale(tokenId, value)
    return result.wait()
  } catch (error) {

    errorLog('上架装备', error)
    return Promise.reject()
  }

}
/**
 * @description 下架
 */
export const stopSellEquipAbi = async (
  provider: Web3Provider,
  sellNo: ethers.BigNumber,
) => {
  const market = getMarketEquip(provider)
  const result = await market.stopSale(sellNo)
  return result.wait()
}
/**
 * @description 购买
 */
export const buyEquipAbi = async (
  provider: Web3Provider,
  sellNo: ethers.BigNumber,
) => {


  try {
    const market = getMarketEquip(provider)
    const result = await market.buy(sellNo)
    return result.wait()
  } catch (error) {

    errorLog('购买装备', error)
    return Promise.reject()
  }
}

