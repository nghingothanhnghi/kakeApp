import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Layout from './layouts'
import ErrorPage from './pages/404'

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ConfirmRegisteredPage from './pages/confirm-registered';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';

import PrivateRouterLayout from './layouts/private-router';
import DefaultPage from './pages/default';
import UsersPage from './pages/users';

const App = () => {
    return (
        <>
            <Routes element={<Layout />} errorElement={<ErrorPage />}>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/success-registeration"
                    element={<ConfirmRegisteredPage />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />
                <Route element={<PrivateRouterLayout />}>
                    <Route path="/" element={<DefaultPage />} />
                    <Route element={<UsersPage />}>
                        <Route index path="users" element={<UsersPage />} />
                        {/* <Route path="edit/:id" element={<AddEditUserPage />} />      */}
                    </Route>
                </Route>
            </Routes>

        </>


    );

};

export default App;