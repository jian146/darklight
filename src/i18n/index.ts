import i18next from 'i18next'
import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'
import { initReactI18next } from 'react-i18next'
const i18nextLng = localStorage.getItem('i18nextLng')

export const resources = {
  'en-US': {
    translation: enUS
  },
  'zh-CN': {
    translation: zhCN
  }
} as const

i18next.use(initReactI18next).init({
  lng: i18nextLng || 'en-US',
  interpolation: {
    escapeValue: false
  },
  resources
})
