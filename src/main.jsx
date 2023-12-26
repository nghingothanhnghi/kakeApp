import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContextProvider } from "./contexts/ToastContext";
import store from './store/store';

import App from './app';

import './index.css'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

