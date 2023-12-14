
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
export default function Header({ sidebar, setSidebar }) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            //   setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            //   setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            //   setShowModeratorBoard(false);
            //   setShowAdminBoard(false);
        }
    }, [currentUser]);

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
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                         {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </div>
                </nav>
            </header>
        </>
    );
}

