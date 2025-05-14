import api from "./axios";

export const getCurrentUser = async () => {
    const response = await api.get("/users");
    console.log("user: ", data);
    return response.data;
}