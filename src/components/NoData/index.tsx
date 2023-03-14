import { useTranslation } from 'react-i18next'
type NoDataProps = { color?: string }

const Index = (props: NoDataProps) => {
  const { t } = useTranslation()
  return (
    <div className="text-center text-primary">{t('noData')}</div>
  )
}

export default Index
