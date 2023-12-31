import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "./header";
import SideMenu from "./side";
export default function PrivateRouterLayout() {
    const [sidebar, setSidebar] = useState(false);
    // check authorized
    const auth = useSelector((state) => state.auth);
    console.log(auth, "user")
    if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }
    return (
        <>
        <div className="flex flex-col h-full">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
            <div className="flex flex-row h-full">
                {sidebar ? (
                    <div className={`sidebar z-40 w-64 h-screen transition-transform  ${sidebar ? "transform-none" : "-translate-x-full"}`}>
                        <SideMenu sidebar={sidebar} setSidebar={setSidebar} />
                    </div>
                ) : null}
                <Outlet />
            </div>
        </div>
        </>
    );
}