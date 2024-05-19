import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { primaryLightTheme } from '../themes/primaryLightTheme'
import { ThemeProvider } from '@mui/material'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={primaryLightTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>,
)