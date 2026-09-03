import { axiosInstance } from "../../../utils/axios";
import type { AuthResponse, UserType } from "../types";


const loginService = async (token: string): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>("/auth/login", { token });
    return res.data;
}

const getMeService = async (): Promise<UserType> => {
    const res = await axiosInstance.get<UserType>("/me");
    return res.data;
}

const logoutService = async (): Promise<void> => {
    await axiosInstance.post("/auth/logout", {});
}

export { loginService, getMeService, logoutService };