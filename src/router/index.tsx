import { Outlet, useRoutes, RouteProps } from 'react-router'
import { lazyLoad } from 'src/utils'

const lazyComponent = (path: string) => {
  const Component = lazyLoad(path)
  return <Component />
}

interface RouterType extends RouteProps {
  name: string
  element?: JSX.Element
  children?: RouterType[]
}


export const routes: Array<RouterType> = [
  {
    name: 'Home',
    path: '/',
    element: lazyComponent('src/pages/home')
  },
  {
    name: 'Game',
    path: 'game',
    element: <Outlet />,
    children: [
      {
        name: 'game',
        index: true,
        element: lazyComponent('src/pages/game')
      },
      {
        name: 'heroDetail',
        path: 'hero/:id',
        element: lazyComponent('src/pages/game/hero_detail')
      },
      {
        name: 'mineDetail',
        path: 'mine/:workname',
        element: lazyComponent('src/pages/game/mine_detail')
      },
      {
        name: 'pvp',
        path: 'pvp/:pvpId',
        element: lazyComponent('src/pages/game/widgets/arena/pvp/pvp')
      },
      {
        name: 'pvpAwait',
        path: 'pvpAwait/:pvpId/:tokenId',
        element: lazyComponent('src/pages/game/widgets/arena/awaitPage/awaitPage')
      },
      {
        name: 'pvpLog',
        path: 'pvpLog',
        element: lazyComponent('src/pages/game/widgets/arena/log/log')
      }
    ]
  },
  {
    name: 'Market',
    path: 'market',
    element: <Outlet />,
    children: [
      {
        name: 'market',
        index: true,
        element: lazyComponent('src/pages/market')
      },
      {
        name: 'buyHero',
        path: 'buy/:id',
        element: lazyComponent('src/pages/market/buy_hero')
      },
      {
        name: 'publishHero',
        path: 'publish',
        element: lazyComponent('src/pages/market/publish_hero')
      },
      {
        name: 'buyEquip',
        path: 'buyEquip/:id',
        element: lazyComponent('src/pages/market/equipBuy')
      },
      {
        name: 'sellEquip',
        path: 'sellEquip',
        element: lazyComponent('src/pages/market/equipSell')
      }
    ]
  },
  {
    name: 'LiquidityMining',
    path: 'liquidity',
    element: <Outlet />,
    children: [
      {
        name: 'liquidity',
        index: true,
        element: lazyComponent('src/pages/liquidity')
      },
      {
        name: 'liquidityDetail',
        path: 'liquidityDetail',
        element: lazyComponent('src/pages/liquidity/detail')
      }
    ]
  },
  {
    name: 'GameWiki',
    path: 'wiki'
  },
  // {
  //   name: 'Offering',
  //   path: 'offering',
  //   element: lazyComponent('src/pages/presale')
  // },
  {
    name: 'BuyNow',
    path: 'd',
    element: lazyComponent('src/pages/game')
  },
  {
    path: '*',
    name: 'notFound',
    element: lazyComponent('src/pages/404')
  }
]

export default function RoutesConfig() {
  return useRoutes(routes)
}

