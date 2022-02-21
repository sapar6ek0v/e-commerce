import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/media.css'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
         <BrowserRouter>
             <App />
         </BrowserRouter>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

