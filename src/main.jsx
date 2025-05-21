import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/inter'; // For the default font weight
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import theme from "./utils/theme.js"
import { ThemeProvider } from '@mui/material/styles';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
      </ThemeProvider>
    </BrowserRouter>
=======
import '@fontsource/inter';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
>>>>>>> origin/route
  </StrictMode>,
)
