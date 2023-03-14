import { errorLog } from 'src/utils/log'
import { I_Equip_market } from '../market'
import { i_marketFilter } from '../market/index_back'
import { axiosRequest, renderServerInfo } from './request'
import { HeroWithPriceTypeWithMarket } from 'src/types/hero'
import { BigNumber, ethers } from 'ethers'
import { message } from 'antd'
const marketUrl = process.env.REACT_APP_MARKET_API
/**
 * 获取市场装备
 */
export const getEquipmarketListApi=async (): Promise<I_Equip_market[]|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/market/allEquipList.json'
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    errorLog('获取市场装备', error)
    return errorData
  }

}

/**
 * 获取市场列表 已废弃
 * @param filter 过滤对象
 * @returns 市场列表,
 */
export const getMarketList = async (filter: i_marketFilter & { page: number } & { buyer?: string, seller?: string }) => {
  const res = await axiosRequest({
    method: 'post',
    url: 'saleList',
    data: filter
  }, marketUrl)
  if (res.status === 200) {
    return res.data
  }

}

/**
 * 获取市场信息
 * @returns pve数据,
 */
export const getMarketApi = async (): Promise<HeroWithPriceTypeWithMarket[]> => {

  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/market/allList.json'
    })
    if (res.status === 200) {
      if (res.data.length>0){
        res.data.map((item:HeroWithPriceTypeWithMarket)=>{
          const {
            strength,
            agility,
            stamina,
            will,
            intelligence,
            mind,
            tokenId,
            // buyer,
            // seller,
            price
          } = item
          item.total= strength+ agility+ stamina+ will+ intelligence+ mind
          // item.tokenId=(tokenId as BigNumber).toHexString()
          item.tokenId= BigNumber.from((tokenId as any).hex).toHexString()
          // item.buyer=(buyer as any).toHexString()
          // item.seller=(seller as any ).toHexString()
          item.price=ethers.utils.formatEther(price)
          return item
        })
      }
      return res.data
    } else {
      return []
    }
  } catch (error) {
    message.info(renderServerInfo)
    return []

  }

}
/**
 * 获取市场英雄详情
 */
export const getHeromarketApi=async (sellNo:number): Promise<HeroWithPriceTypeWithMarket|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/market/hero',
      params: {
        sellNo
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    errorLog('获取市场装备详情', error)
    return errorData
  }

}

/**
 * 获取市场装备详情
 */
export const getEquipmarketApi=async (sellNo:number): Promise<I_Equip_market|null> => {
  const errorData=null
  try {
    const res = await axiosRequest({
      method: 'get',
      url: '/market/equip',
      params: {
        sellNo
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    errorLog('获取市场装备详情', error)
    return errorData
  }

}
