import { axiosInstance } from "./axios";

export const singup = async (singupData) => {
  const response = await axiosInstance.post("/auth/signup", singupData);
  console.log(response.data);
};
export const login = async (singupData) => {
  const response = await axiosInstance.post("/auth/login", singupData);
  console.log(response.data);
};

export const getAuthUser = async () => {
  console.log("is run getAuthUser")
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completonBoarding = async(userData)=>{
  console.log("completonBoarding run")
  console.log(userData)
  const response = await axiosInstance.post("/auth/onboarding", userData);
   console.log("completonBoarding run")
  console.log("response",response)
  return response.data
}
