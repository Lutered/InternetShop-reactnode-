import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

//import UserStore from "./store/UserStore";
//import DeviceStore from "./store/DeviceStore";
//import reportWebVitals from './reportWebVitals';

//export const Context = createContext(null)

const root = createRoot(  
  document.getElementById('root')
);

root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
