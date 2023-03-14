import { HeroType } from 'src/types/hero'
import { axiosRequest } from './request'

export interface i_makeHeroApi_back{
    hero:HeroType
    isUseLucky:boolean
    luckyRate:number
}
/**
 * 抽卡获取英雄信息
 * @param tokenIds 英雄id数组
 * @returns pve数据,
 */
export const getHerosApi =async ( tokenIds:string[]): Promise<i_makeHeroApi_back[]> => {
  const errorData: i_makeHeroApi_back[]=[]
  try {
    const res = await axiosRequest({
      method: 'post',
      url: '/hero/getHeros',
      data: {
        tokenIds
      }
    })
    if (res.status === 200) {
      return res.data
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取我的装备失败')
    return errorData
  }

}


/**
 * 获取幸运值
 * @param playerAddress 玩家地址
 * @returns 幸运值,
 */
export const getHeroLuckyRate = async (playerAddress:string): Promise<number> => {
  const errorData =0
  try {

    const res = await axiosRequest({
      method: 'get',
      url: `/hero/getHeroLuckyRate?player=${playerAddress}`
    })
    if (res.status === 200&&res.data&&res.data.luckyRate) {
      return res.data.luckyRate
    } else {
      return errorData
    }
  } catch (error) {
    console.error('获取幸运值')
    return errorData
  }

}
