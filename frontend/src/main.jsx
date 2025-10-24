import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { SearchProvider } from './context/SearchContext.jsx';
import {ProductProvider} from "./context/ProductContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <Provider store={store}>
     <SearchProvider>
       <ProductProvider>  {/* Wrap App inside ProductProvider */}
          <App />
        </ProductProvider>
      </SearchProvider>
    </Provider>
  </StrictMode>,
)
