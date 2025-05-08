import { useEffect, useState } from "react";
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./app/router/AppRouter";
import NavBar from "./app/components/NavBar/NavBar";

import GlobalModals from "./app/modals/globalModals";

import InitFn from "./initFn";

import './App.css';

function App() {

  useEffect(() => {
    InitFn();
  }, []);

  return (
    <BrowserRouter>
      <GlobalModals />
      
      <NavBar />
      <div className="router-container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
