import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Alert } from "../components/alert";
import { history } from "../helpers/history";
export default function Layout() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <>
      <Alert />
      <Outlet />
    </>
  );
}