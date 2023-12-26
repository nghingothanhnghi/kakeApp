import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useCallback } from "react";

export default function Layout() {

  return (
    <>
      <Outlet />
    </>
  );
}