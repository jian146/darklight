import React from 'react'
import Loading from './components/Loading'
import RoutesConfig from './router'
import Layout from 'src/layout'
import BackTop from './components/BackTop'
import './i18n/index'

function App() {
  return (
    <Layout>
      <React.Suspense fallback={<Loading center />}>
        <BackTop />
        <RoutesConfig />
      </React.Suspense>
    </Layout>
  )
}

export default App
