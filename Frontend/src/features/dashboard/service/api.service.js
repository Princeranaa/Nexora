import api from "../../../App/config/axiosInstance";

export const logout = async () => {
  const response = await api.get("/logout");
  console.log("Logout", response);
  return response.data;
};
