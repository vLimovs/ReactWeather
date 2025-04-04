import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/main.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)