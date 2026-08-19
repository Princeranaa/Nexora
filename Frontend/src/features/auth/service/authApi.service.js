import api from "../../../App/config/axiosInstance";

export async function Login ({email,password})  {
    const response = await api.post("/login",{email,password});
     return response.data
}

export async function Register ({fullname:{firstname,lastname},email,password})  {
    const response = await api.post("/register",{fullname:{firstname,lastname},email,password});
    return response.data
}

export async function getMe() {
    const response = await api.get("/profile")
    return response.data
}

 