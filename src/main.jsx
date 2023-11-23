import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {  Routes, Route, Navigate, useNavigate, useLocation } from "react-router"

import { Provider } from 'react-redux';

import Layout from './layouts'
import ErrorPage from './pages/404'

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Routes element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route>
        <Route/>
      </Route>
    </Routes>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

