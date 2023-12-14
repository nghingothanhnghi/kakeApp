import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Branding } from "../../components/logo";
import LoadingComponent from "../../components/loading";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { confirmSignUp, resendCodeConfirm } from "../../slices/auth";
import { useToast } from "../../hooks/useToast";
import { clearMessage } from "../../slices/message";
export default function ConfirmRegisteredPage() {
    const navigate = useNavigate();
    const { message } = useSelector(state => state.message);
    const toast = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const { search } = window.location;
    // console.log(search, "******** SEARCH *********")
    const email = new URLSearchParams(search).get('email');


    // form validation rules 
    const validationSchema = Yup.object().shape({
        confirm_code: Yup.string()
        // .required('Not empty. Please check 6 digits code in email or Resend another code.')
        // .test('len', 'Must be exactly 6 number', val => val.length === 6),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions, {
        criteriaMode: 'all',
        defaultValues: {
            confirm_code: '',
            email: email,
        }
    });
    const { errors, isSubmitting } = formState;


    async function onSubmit({ email, confirm_code }, e) {
        e.preventDefault();
        const action = e.nativeEvent.submitter.name;
        console.log(email, confirm_code);
        try {
            if (action === 'confirm') {
                // Dispatch confirm action
                const res = await dispatch(confirmSignUp({ email, confirm_code })).unwrap();
                if (res.error === true) {
                    console.log(JSON.stringify(res), `code ${confirm_code} sent!`);
                    toast.error(res.message)
                } else {
                    console.log(res.message, `code successfully.`);
                    toast.success(res.message)
                    navigate(`/login`);
                    // redirect to login page and display success alert
                }
            } else if (action === 'resendCode') {
                const res = await dispatch(resendCodeConfirm({ email }))
                    .unwrap();
                    if (res.error === true) {
                        console.log(res.message, "resend code DATA LOG")
                        toast.error(res.message)
                    }else{
                        toast.success(res.message)
                    }
            }
            // Additional logic after successful resend code or confirm
        } catch (error) {
            console.log(JSON.stringify(error), "error")
            toast.error(error.message)
        }
    }
    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Branding />
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight">
                            Confirm Code
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <p>Enter the 6 digit(s) code that was sent to <b>{email}</b> within 5 minutes. Please check its and typing code below </p>
                            <input value={email} {...register('email')} type="hidden" name="email" />
                            <div>
                                <label htmlFor="confirm_code" className="block mb-2 text-sm font-medium">Verify Code</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z" clipRule="evenodd" />
                                        </svg>

                                    </div>
                                    <input type="text" name="confirm_code" {...register('confirm_code')} className={`ps-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.confirm_code ? 'is-invalid' : ''}`} />
                                    <button name="resendCode" disabled={isSubmitting} className="absolute end-2.5 bottom-2.5">Resend Code</button>
                                </div>
                                <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.confirm_code?.message}</div>
                            </div>
                            <button name="confirm" disabled={isSubmitting} type="submit" className="flex justify-center text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{isSubmitting && <LoadingComponent width={20} height={20} />} {!isSubmitting && <span>Confirm</span>}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}