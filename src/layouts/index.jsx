import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useCallback } from "react";

export default function Layout() {
  // const {user : currentUser} = useSelector ((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if(currentUser){
  //   console.log(currentUser, "current user")
  //   }else{

  //   }
  // }, [currentUser])

  return (
    <>
      <Outlet />
    </>
  );
}