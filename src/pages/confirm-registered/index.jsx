import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Branding } from "../../components/logo";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { confirmSignUp } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
export default function ConfirmRegisteredPage() {
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    console.log(currentUser, "current username")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors, isSubmitting } = formState;
    function onSubmit({ username, confirm_code }) {
        return dispatch(confirmSignUp({ username, confirm_code }))
            .unwrap()
            .then((res) => {
                // navigate("/");
                // window.location.reload();
                console.log(res)
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
                            Confirm Code
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <input value="dwedwedwe" type="hidden" name="username" />
                            <div>
                                <label htmlFor="confirm_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verify Code</label>
                                <input type="text" name="confirm_code" {...register('confirm_code')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button disabled={isSubmitting} type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}