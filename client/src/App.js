import { useEffect, useState } from "react";
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./app/router/AppRouter";
import NavBar from "./app/components/NavBar/NavBar";
import BasketModal from "./app/modals/BasketModal/BasketModal";

import InitFn from "./initFn";

import './App.css';

function App() {

  useEffect(() => {
    InitFn();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <BasketModal />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
