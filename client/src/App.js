import {BrowserRouter} from "react-router-dom";

import Cookies from 'js-cookie';

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

import './App.css';

//delete cookies in dev mode
if (process.env.REACT_APP_RUNTIME_MODE == 'DEBUG') {
  Object.keys(Cookies.get()).forEach(function(cookieName) {
    Cookies.remove(cookieName, { path: '' });
  });
}

function App() {
  return (
    <BrowserRouter>
       <NavBar />
       <AppRouter />
  </BrowserRouter>
  );
}

export default App;
