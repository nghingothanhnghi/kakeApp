import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./header";
import SideMenu from "./side";
export default function PrivateRouterLayout() {
    const [sidebar, setSidebar] = useState(false);
    return (
        <>
        <div className="flex flex-col h-full">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
            <div className="flex flex-row h-full">
                {sidebar ? (
                    <div className={`sidebar ${sidebar ? "transform-x-0" : "transform-x-full"}`}>
                        <SideMenu sidebar={sidebar} setSidebar={setSidebar} />
                    </div>
                ) : null}
                <Outlet />
            </div>
        </div>
        </>
    );
}