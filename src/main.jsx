import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from "axios";
import { Provider } from 'react-redux';
import store from './redux/store';


axios.defaults.baseURL = "http://localhost:3001"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
)
