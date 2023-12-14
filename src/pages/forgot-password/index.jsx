import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Branding } from "../../components/logo";
import LoadingComponent from "../../components/loading";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "../../hooks/useToast";
import { forgotPassword } from "../../slices/auth";
export default function ForgotPasswordPage() {
    const { user } = useSelector(x => x.auth);
    const toast = useToast();
    const dispatch = useDispatch();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Email is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    function onSubmit({ username }) {
        return dispatch(forgotPassword({ username }))
            .unwrap()
            .then((res) => {
                if (res.error === true) {
                    console.log(JSON.stringify(res), `code's sent to ${username}!`);
                    toast.error(res.user.message)
                } else {
                    console.log(res.user.message, `code successfully.`);
                    toast.success(res.user.message)
                    navigate(`/reset-password`);
                    // redirect to reset password page and display success alert
                }
            })
            .catch((err) => {
                // handle error
                console.log(err, "error")
            })
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Branding />
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot your password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="text" name="username" {...register('username')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'is-invalid' : ''}`} placeholder="name@company.com" />
                                <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</div>
                            </div>
                            <button disabled={isSubmitting} type="submit" className="flex justify-center w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{isSubmitting && <LoadingComponent width={20} height={20} />} {!isSubmitting && <span>Reset passwod</span>}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}