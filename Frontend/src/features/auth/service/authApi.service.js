import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
});

export async function Login ({email,password})  {
    const response = await api.post("/login",{email,password});
     return response.data
}


export async function Register ({fullname:{firstname,lastname},email,password})  {
    const response = await api.post("/register",{fullname:{firstname,lastname},email,password});
    return response.data
}