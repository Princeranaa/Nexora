import api from "../../../App/config/axiosInstance";

export const updateProfile = async (data) => {
  const response = await api.patch("/update-profile", data);
  console.log("updated-Response---->", response)
  return response.data;
};