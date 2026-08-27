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
   
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function addEmployee(employeeData) {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function updateEmployeeStatus(employeeId, status) {
  try {
    const response = await api.patch(`/employees/${employeeId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
