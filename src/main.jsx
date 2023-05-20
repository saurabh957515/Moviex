import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { configureStore  } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <App />
</Provider>
)
