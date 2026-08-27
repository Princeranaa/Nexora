import { getMe, Login, Register } from "../service/authApi.service";
import { useDispatch } from "react-redux";
import { setEmployee, setError, setLoading } from "../auth.slice";
import { toast } from "react-toastify";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleLogin({ email, password }) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const response = await Login({ email, password });
      dispatch(setEmployee(response?.user));
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.log("error", error);
      const errorMessage =
      error.response?.data?.message;
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleRegister({ fullName, email, password }) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));

      const nameParts = fullName.trim().split(/\s+/);

      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(" ");

      const response = await Register({
        fullname: {
          firstname,
          lastname,
        },
        email,
        password,
      });

      dispatch(setEmployee(response?.user));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Something Went Wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const response = await getMe();
      dispatch(setEmployee(response?.user));
    } catch (error) {
      if (error.response?.status !== 401) {
        dispatch(setError(error.response?.data?.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleLogin,
    handleRegister,
    handleGetMe,
  };
}
