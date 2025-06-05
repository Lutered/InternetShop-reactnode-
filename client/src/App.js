import { useEffect } from "react";
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./app/router/AppRouter";
import NavBar from "./app/components/NavBar/NavBar";
import ErrorBoundary from "./ErrorBoundary";

import GlobalModals from "./app/modals/globalModals";

import InitFn from "./initFn";

import './external/bootstrap/css/bootstrap.min.css';

import './App.css';

function App() {
  useEffect(() => {
    InitFn();
  }, []);

  return (
      <BrowserRouter>
        <ErrorBoundary>
          <GlobalModals />
          
          <NavBar />
          <div className="router-container">
            <AppRouter />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
  );
}

export default App;
