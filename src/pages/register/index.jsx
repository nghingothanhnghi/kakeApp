import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { Branding } from "../../components/logo";

// import { history } from '../../helpers';
// import { userActions, alertActions } from '../../store';

import { registeUser } from "../../slices/auth";
import { clearMessage } from "../../slices/message";


export default function RegisterPage() {
    const [successful, setSuccessful] = useState(false);
    const navigate = useNavigate();
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
      }, [dispatch]);
    
      const initialValues = {
        username: "",
        email: "",
        password: "",
      };

    // form validation rules 
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full Name is required'),
        // email: Yup.string()
        //     .required('Email is required'),
        phone_number: Yup.string()
            .required('Phone is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(12, "Password cannot exceed more than 12 characters"),
        cpassword: Yup.string()
            .required("Confirm Password is required")
            .min(6, "Password length should be at least 6 characters")
            .max(12, "Password cannot exceed more than 12 characters")
            .oneOf([Yup.ref("password")], "Passwords do not match")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit({ fullname, username, phone_number, password, cpassword }) {
        console.log(fullname, username, phone_number, password, cpassword)
        // try {
        //     dispatch(registeUser({ fullname, username, phone_number, password, cpassword })).unwrap();
        //     setSuccessful(true);
        // } catch (error) {
        //     setSuccessful(false);
        // }
        return dispatch(registeUser({  fullname, username, phone_number, password }))
        .unwrap()
        .then((res) => {
            navigate("/success-registeration");
            // window.location.reload();
            console.log(res, "success")
        })
        .catch((err) => {
            // handle error
            console.log(err, "error")
        })
    }

    console.log(onSubmit)

    return (
        <>
            {message && (
                <div className="form-group">
                    <div
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Branding />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-2 md:space-y-2" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your FullName</label>
                                    <input type="text" name="fullname" {...register('fullname')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.fullname ? 'is-invalid ' : ''}`} required="" />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fullname?.message}</div>
                                </div>
                                <div className="flex flex-row gap-x-2">
                                    {/* <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email" name="email" {...register('email')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'is-invalid ' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</div>
                                        </div>
                                    </div> */}
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                            <input type="phone" name="phone_number" {...register('phone_number')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.phone_number ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone_number?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" {...register('username')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'is-invalid' : ''}`} />
                                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</div>
                                </div>
                                <div className="flex flex-row gap-x-2">
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" {...register('password')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</div>
                                        </div>
                                    </div>
                                    <div className="basis-1/2">
                                        <div>
                                            <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                            <input type="password" name="cpassword" {...register('cpassword')} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.cpassword ? 'is-invalid' : ''}`} />
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.cpassword?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button disabled={isSubmitting} type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">  {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>} Create an account</button>
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