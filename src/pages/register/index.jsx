import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useToast } from "../../hooks/useToast";
import LoadingComponent from "../../components/loading";
import { Branding } from "../../components/logo";


import { registeUser } from "../../slices/auth";
import { clearMessage } from "../../slices/message";


export default function RegisterPage({email}) {
    const navigate = useNavigate();
    const toast = useToast();
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full Name is required'),
        email: Yup.string()
            .required('Email is required'),
        phone_number: Yup.string()
            .required('Phone is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character')
            .min(8, 'Password must be at least 8 characters'),
            
        cpassword: Yup.string()
            .required("Confirm Password is required")
            .min(8, 'Password must be at least 8 characters')
            .oneOf([Yup.ref("password")], "Passwords do not match")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions, {
        criteriaMode: 'all',
        defaultValues: {
            fullname: '',
            email: '',
            phone_number: '',
            password:'',
            term_policy: [],
            // radio: ''
          }
    });
    const { errors, isSubmitting } = formState;

    async function onSubmit({ fullname, email, phone_number, password, cpassword }, e) {
        e.preventDefault();
        console.log(fullname, email, phone_number, password, cpassword)
        try {
            await dispatch(registeUser({ fullname, email, phone_number, password, cpassword })).unwrap()
            .then((res) => {
                console.log(res.message);
                if (res.error === true) {
                  console.log(`Username ${email} exists!`);
                  toast.error(res.message)
                } else {
                  console.log(`Username ${email} does not exist.`);
                  toast.success(res.message)
                  navigate(`/success-registeration?email=${email}`);
                  // redirect to login page and display success alert
                }
              })   
        } catch (err) {
            console.log(err.message, "message response error")
            toast.error(err.message)
        }
    }
    // console.log(onSubmit)

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Branding />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight">
                                New account
                            </h1>
                            <form className="space-y-2 md:space-y-2" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium">Your FullName</label>
                                    <input type="text" name="fullname" {...register('fullname')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.fullname ? 'is-invalid ' : ''}`} required="" />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fullname?.message}</div>
                                </div>
                                <div className="flex flex-row gap-x-2">
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                            <input value={email} type="email" name="email" {...register('email')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  ${errors.email ? 'is-invalid ' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</div>
                                        </div>
                                    </div>
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">Your phone</label>
                                            <input type="phone" name="phone_number" {...register('phone_number')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  ${errors.phone_number ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone_number?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" {...register('username')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'is-invalid' : ''}`} />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</div>
                                </div> */}
                                <div className="flex flex-row gap-x-2">
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                            <input type="password" name="password" {...register('password')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.password ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</div>
                                        </div>
                                    </div>
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="cpassword" className="block mb-2 text-sm font-medium">Confirm password</label>
                                            <input type="password" name="cpassword" {...register('cpassword')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.cpassword ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.cpassword?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input checked disabled {...register("term_policy", { required: true })} type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light ">I accept the <a className="font-medium" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button disabled={isSubmitting} className="flex justify-center w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{isSubmitting && <LoadingComponent width={20} height={20} />} {!isSubmitting && <span>Create an account</span>} </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}