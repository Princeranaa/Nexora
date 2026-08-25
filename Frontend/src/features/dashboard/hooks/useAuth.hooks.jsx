import { useDispatch } from "react-redux";
import { setError, setLoading, setLogout } from "../../auth/auth.slice";
import { logout } from "../service/api.service";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const response = await logout();
      dispatch(setLogout(response?.message));
      navigate("/");
    } catch (error) {
      console.log("Logout Issue", error);
    }
  }

  return {
    handleLogout,
  };
}
