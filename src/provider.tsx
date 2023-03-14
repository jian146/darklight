import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WindowSizeProvider } from './context'

const id = process.env.REACT_APP_CHAIN_ID
// 后台本地测试端口，用户测试
const localId = process.env.REACT_APP_LOCAL_CHAIN_ID
const chainId = id ? localId ? [parseInt(localId), parseInt(id)] : [parseInt(id)] : []

export const injected = new InjectedConnector({
  supportedChainIds: chainId
})

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


const Provider: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WindowSizeProvider>
        {children}
      </WindowSizeProvider>
    </Web3ReactProvider>
  )
}

export default Provider
