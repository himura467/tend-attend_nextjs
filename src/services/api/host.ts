import axiosInstance from "@/services/api/axios-instance";
import { CreateHostAccountRequest, CreateHostAccountResponse } from "@/services/api/dtos/account";
import { OAuth2PasswordRequestForm, CreateAuthTokenResponse } from "@/services/api/dtos/auth";

export const createHostAccount = async (data: CreateHostAccountRequest): Promise<CreateHostAccountResponse> => {
  const response = await axiosInstance.post<CreateHostAccountResponse>("/accounts/hosts", data);
  return response.data;
};

export const createAuthToken = async (data: OAuth2PasswordRequestForm): Promise<CreateAuthTokenResponse> => {
  const response = await axiosInstance.post<CreateAuthTokenResponse>("/auth/token", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    withCredentials: true,
  });
  return response.data;
};