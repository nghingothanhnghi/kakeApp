import { useRouteError, Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    return (
        <>
            <section className="flex flex-col justify-center">
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                    <h1 className="mb-10  text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Oops!</h1>
                    <p className="mb-0 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Sorry, an unexpected error has occurred.</p>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400 mb-4">
                     
                    </p>
                    <Link to="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Visit Our Homepage</Link>
                </div>
            </section>
        </>
    );
}