import React, { useEffect } from 'react'
import { useUrlQueryParam } from 'src/utils/url'
import { Dropdown, Menu, message } from 'antd'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { GameWrapper, MTab, MTabs } from './style'
import { EquType, useWindowSize } from 'src/context'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

const moduleFiles = require.context('./widgets', true, /\.tsx$/)
const modules = moduleFiles.keys().reduce((modules: { [key: string]: () => any }, path) => {
  const name = path.replace(/^\.\/(.*)\/index\.tsx$/, '$1')
  const value = moduleFiles(path)
  modules[name] = value.default
  return modules
}, {})

type TabsType = {
  name: string,
  id: string
  children?:TabsType[]
}
const tabs: TabsType[] = [
  {
    id: 'card',
    name: 'RecruitHero'
  },
  {
    id: 'heros',
    name: 'MyHero'
  },
  {
    id: 'magic1',
    name: 'magicHouse',
    children: [
      {
        id: 'magic',
        name: 'magicHouse'
      },
      {
        id: 'alchemy',
        name: 'alchemy'
      },
      {
        id: 'forge',
        name: 'forge'
      }
    ]
  },

  {
    id: 'mine',
    name: 'GoldMining'
  },
  // {
  //   id: 'adventure1',
  //   name: 'adventure1',
  //   children: [
  //     {
  //       id: 'adventure',
  //       name: 'Adventure'
  //     },
  //     {
  //       id: 'arena',
  //       name: 'arena'
  //     }
  //   ]
  // },
  {
    id: 'adventure',
    name: 'Adventure'
  },
  {
    id: 'arena',
    name: 'arena'
  },
  {
    id: 'charts',
    name: 'Leaderboard'
  },
  {
    id: 'lottery',
    name: 'TreasureBox'
  },
  {
    id: 'backpack',
    name: 'MyBackpack'
  }
]

interface TabPanelProps {
  index: string
  value: string
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
      {...other}
    >
      {
        value === index && children
      }
    </div>
  )
}

const Game: React.FC = () => {

  const isOldOpen=true
  const [params, setParams] = useUrlQueryParam(['name'])
  const name = params.name || 'card'
  const { windowSize } = useWindowSize()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleTabsClick = (event: React.SyntheticEvent, name: string) => {
    if ( isClosePage(name)){
      return
    }
    if (name === 'charts') {
      message.info(t('game.OpeningSoon'))
    } else {
      setParams({ name })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    isClosePage(name)
  }, [])

  const isClosePage=(key:string)=>{
    // const page=['adventure', 'forge', 'lottery', 'backpack']
    // if ( page.indexOf(key)>=0){
    //   message.info(`
    //   [PVE, equipment, key] under maintenance
    //   [pve ,装备,钥匙]正在维护
    //   `)
    //   navigate('/')
    //   return true
    // }
    if (!key){
      navigate('/')
    }
    return false
  }


  const onSelect = (data:{key:string, domEvent:React.SyntheticEvent}) => {
    const {key, domEvent}=data
    setParams({ name: key })
    if ( isClosePage(key)){
      return
    }
    domEvent.stopPropagation()

  }
  const getPage=()=>{
    let findItem:undefined|TabsType=undefined

    tabs.forEach((tab)=>{
      if (tab.children&&tab.children.length>0){
        tab.children.forEach((chTab)=>{
          if (name===chTab.id){
            findItem=chTab
          }
        })
      } else {
        if (name===tab.id){
          findItem=tab
        }
      }
    })

    if (findItem===undefined||(findItem as TabsType )?.id===undefined) return ''
    const Lazycomponents = modules[(findItem as TabsType )?.id]
    return <TabPanel key={(findItem as TabsType )?.id} value={name} index={(findItem as TabsType )?.id}>
      {
        Lazycomponents ? <Lazycomponents /> : <div />
      }
    </TabPanel>
  }

  return (
    <GameWrapper>
      {/* <div className="menuBox">
        <div className='leftIcon'></div>
        <Menu onSelect={onSelect} selectedKeys={[name]} mode="horizontal" className="menuList"
          inlineIndent={24}
          overflowedIndicator={false}
        >

          {tabs.map((item)=>{
            if (!item.children||item.children.length===0){
              return <Menu.Item key={item.id}>{t(`game.nav.${item.name}`)}</Menu.Item>
            } else {
              const findChildren= item.children.find((item)=>item.id===name)

              return <Menu.SubMenu key={item.id} onTitleClick={()=>{
              }} title={<div className={`faSubItem ${findChildren?'selectChildren':''}`}>
                {findChildren?t(`game.nav.${findChildren.name}`):t(`game.nav.${item.name}`)}
                < ArrowDropDownIcon />
              </div>}>
                {
                  item.children.map((chItem)=>{
                    return <Menu.Item key={chItem.id}>{t(`game.nav.${chItem.name}`)}</Menu.Item>
                  })
                }

              </Menu.SubMenu>
            }

          })}

        </Menu>
        <div className='rightIcon'></div>
      </div> */}


      { isOldOpen&& <MTabs
        value={name}
        onChange={handleTabsClick}
        variant="scrollable"
        scrollButtons={windowSize === EquType.PHONE}
      >

        {
          tabs.map((item, index) => {
            if (!item.children||item.children.length===0){
              return <MTab
                disableRipple
                key={index}
                value={item.id}
                label={t(`game.nav.${item.name}`)}
              />
            } else {
              const findChildren= item.children.find((item)=>item.id===name)
              const chId=findChildren?findChildren.id:item.children[0].id
              const chName=findChildren?findChildren.name:item.children[0].name
              const menu = (
                <Menu onClick={onSelect}>
                  {item.children.map((chItem)=>{
                    return <Menu.Item key={chItem.id}> {t(`game.nav.${chItem.name}`)}</Menu.Item>
                  }
                  )}


                </Menu>
              )
              return <MTab
                disableRipple
                key={index}
                value={chId}
                label={
                  <Dropdown overlay={menu} trigger={windowSize === EquType.PHONE?['click']:['hover']}>
                    <span className="flex items-center ">
                      {t(`game.nav.${chName}`)} < ArrowDropDownIcon />
                    </span>
                  </Dropdown>}
              />
            }

          })
        }
      </MTabs>}
      {
        getPage()
      }
    </GameWrapper>
  )
}

export default Game
