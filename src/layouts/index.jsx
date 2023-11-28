import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Alert } from "../components/alert";
// import { history } from "../helpers";
export default function Layout() {
  // history.navigate = useNavigate();
  // history.location = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <><div>
      <Alert />
      <Outlet />
    </div>

    </>
  );
}