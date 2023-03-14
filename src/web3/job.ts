import { Web3Provider } from '@ethersproject/providers'
import { notification } from 'antd'
import { BigNumber, ethers } from 'ethers'
import { WorkHeroType } from 'src/types/mine'
import { getHero, getJob, JOB_ADDRESS } from '.'
import { getHeroByTokenId } from './hero'

/**
 * @description job 授权
 * @param provider Web3React Library
 * // 授权失败链上应该会报错
 */
export const jobAuthorize = async (provider: Web3Provider) => {
  const hero = getHero(provider)
  const tx = await hero.setApprovalForAll(JOB_ADDRESS, true)
  return tx.wait()
}

/**
 * @description 查询 job 授权
 * @param provider Web3React Library
 */
export const getJobAuthorize = async (
  provider: Web3Provider
): Promise<boolean> => {
  const hero = getHero(provider)
  return await hero.isApprovedForAll(
    await provider.getSigner().getAddress(),
    JOB_ADDRESS
  )
}

export type JobType = 1 | 2 | 3
/**
 * @description 开始工作
 * @param provider Web3React Library
 * @param tokenId 英雄tokenid
 * @param type 工作类型 1 兼职工作， 2  专职工作
 * @param mapId 地图id
 */
export const startJob = async (
  provider: Web3Provider,
  tokenId: string,
  type: 1 | 2 | 3,
  mapId: number
) => {
  const job = getJob(provider)
  const tx = await job.startJob(tokenId, type, mapId)
  return await tx.wait()
}

/**
 * @description 查询工作收益
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 */
export const queryJobRewared = async (
  provider: Web3Provider,
  tokenId: BigNumber
): Promise<BigNumber> => {
  const job = getJob(provider)
  return await job.jobReward(tokenId)
}

/**
 * @description 退出工作
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 */
export const endJob = async (provider: Web3Provider, tokenId: string) => {
  const job = getJob(provider)
  const tx = await job.endJob(tokenId)
  return tx.wait()
}

/**
 * @description 查询区块
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 * @returns Promise
 */
export const queryRewards = async (
  provider: Web3Provider,
  tokenId: BigNumber
): Promise<{ blockN: BigNumber, [key: string | number]: any }> => {
  const job = getJob(provider)
  return await job.rewards(tokenId)
}

/**
 * @description 提取工作收益
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 * @returns Pormise<BigNumber>
 */
export const extractJobReward = async (
  provider: Web3Provider,
  tokenId: string
) => {
  const job = getJob(provider)
  const tx = await job.claimJobReward(tokenId)
  return tx.wait()
}

/**
 * @description 批量提取工作收益
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 * @returns Pormise<BigNumber>
 */
export const extractJobRewards = async (
  provider: Web3Provider,
  tokenIdList: string[]
) => {
  const job = getJob(provider)
  const tx = await job.claimJobRewards(tokenIdList)
  return tx.wait()
}


/**
 * @description 批量退出工作
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 * @returns Pormise<BigNumber>
 */
export const endJobsAbi = async (
  provider: Web3Provider,
  tokenIdList: string[]
) => {
  const job = getJob(provider)
  try {
    const tx = await job.endJobs(tokenIdList, {gasLimit: 4000000})
    return tx.wait()
  } catch (error) {
    console.error('批量退出工作异常', error)
    return Promise.reject(error)

  }

}


/**
 * 获取疲劳值
 * @param provider web3React Library
 * @param tokenId 英雄的tokenId
 */
export const getFatigueValue = async (
  provider: Web3Provider,
  tokenId: BigNumber
): Promise<BigNumber> => {
  const job = getJob(provider)
  return await job.lastFatigue(tokenId)
}

/**
 * @description 获取地图中参与英雄的tokenId集合
 * @param provider web3React Library
 * @param mapId 地图id
 */
export const getJobTokenIds = async (
  provider: Web3Provider,
  mapId: number
): Promise<BigNumber[]> => {
  const job = getJob(provider)
  const address = await provider.getSigner().getAddress()
  return await job.getJobList(address, mapId)
}


/**
 * @description 获取工作列表
 */
export const getJobList = async (
  provider: Web3Provider,
  mapId: number
): Promise<WorkHeroType[]> => {
  const tokenIds = await getJobTokenIds(provider, mapId)
  const list: WorkHeroType[] = []
  try {
    for (const tokenId of tokenIds) {
      // 收益
      const jobReward = await queryJobRewared(provider, tokenId)
      const reward = ethers.utils.formatEther(jobReward)
      // 区块
      const { blockN } = await queryRewards(provider, tokenId)
      // 使用最新的疲劳值
      const fatigue = await getFatigueValue(provider, tokenId)
      const targetHero = await getHeroByTokenId(provider, tokenId.toHexString())
      list.push({
        ...targetHero,
        blockN: blockN.toString(),
        reward,
        fatigue: (fatigue as BigNumber).toNumber()
      })
    }
  } catch (e: any) {
    notification.error({
      message: 'Error',
      description: e.message || 'Error'
    })
  }
  return list
}
