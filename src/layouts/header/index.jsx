
import { Link } from "react-router-dom";
export default function Header({ sidebar, setSidebar }) {
    return (
        <>
            <header className="px-4 max-w-desktop mx-auto text-blacklight">
                <nav className="flex lg:flex-row items-center flex-auto justify-between lg:mx-auto md:py-6 py-4 relative navigation">
                    <div className="flex flex-row items-center">
                        <img src="./assets/logo.svg" alt="fab systems" />
                        <h2 className="text-lg font-extrabold flex-none ml-1 leading-none">
                            FAB <br />
                            SYSTEMS
                        </h2>
                    </div>
                    <div className="lg:hidden">
                        <svg
                            className="w-8 h-8 lg:hidden"
                            id="hamburger"
                            onClick={() => setSidebar(true)}
                            fill="none"
                            stroke="#354650"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </div>
                </nav>
            </header>
        </>
    );
}

