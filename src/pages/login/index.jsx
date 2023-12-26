import { useRouteError, Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useToast } from "../../hooks/useToast";
import { Branding } from "../../components/logo";
import LoadingComponent from "../../components/loading";

import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";


export default function LoginPage() {
    const navigate = useNavigate();
    const toast = useToast();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message)
    console.log(isLoggedIn, "state authorize")
    console.log(message, "message state")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions, {
        criteriaMode: 'all',
        defaultValues: {
            username: '',
            password: '',
          }
    });
    const { errors, isSubmitting } = formState;

    async function onSubmit({ username, password }, e) {
        e.preventDefault();
        try {
            await dispatch(login({ username, password }))
            .unwrap()
            .then((res) => {
                console.log(JSON.stringify(res), "response for handle error")
                if (res.error === true) {
                    toast.error(res.message)    
                    // window.location.reload();
                }else{
                    console.log(JSON.stringify(res), "response for success")
                    toast.success(res.message)
                    navigate("/");
                }
            })
        }catch(err)  {
            // handle error
            console.log(JSON.stringify(err), "error")
            toast.error(err.message) 
        }
                 
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <form className="bg-gray-50 dark:bg-gray-900" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Branding />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="text" name="username" {...register('username')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'is-invalid' : ''}`} required="" />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" {...register('password')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'is-invalid' : ''}`} required="" />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button disabled={isSubmitting} type="submit" className="flex justify-center w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">  {isSubmitting && <LoadingComponent width={20} height={20} />} {!isSubmitting && <span>Sign in</span>}</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?  <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}