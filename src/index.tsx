import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'
import Provider from './provider'
import 'src/assets/web-font/index.css'
import GlobalStyle from './global_style'

ReactDOM.render(
  <Provider>
    <Router>
      <App />
      <GlobalStyle />
    </Router>
  </Provider>,
  document.getElementById('root')
)
