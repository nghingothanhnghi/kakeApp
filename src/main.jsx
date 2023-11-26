import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router"

import { Provider } from 'react-redux';

import { PrivateRoute } from './components/private-router';
import { store } from './store';

import Layout from './layouts'
import ErrorPage from './pages/404'

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';

import DefaultPage from './pages/default';
import UsersPage from './pages/users';
import AddEditUserPage from './pages/users/add-edit';
import './index.css'

// setup fake backend
import { fakeBackend } from './helpers';
fakeBackend();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="register"
        element={<RegisterPage />}
      />
      <Route
        path="forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="reset-password"
        element={<ResetPasswordPage />}
      />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DefaultPage />} />
        <Route  element={<UsersPage />}>
          <Route index path="users/" element={<UsersPage />} />
          <Route path="edit/:id" element={<AddEditUserPage />} />     
        </Route>
       
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

