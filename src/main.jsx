import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppTopBar from './components/AppBar'
import RestaurantGrid from './components/RestaurantGrid'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTopBar />
    <RestaurantGrid />
    {/* <App /> */}
  </React.StrictMode>
)
