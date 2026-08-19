import api from "../../../../App/config/axiosInstance";

export async function getAllEmployee(page = 1, limit = 10, search = "") {
  try {
    const response = await api.get("/employees", {
      params: {
        page,
        limit,
        search,
      },
    });
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}
