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
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};


export const completonBoarding = async(userData)=>{

  const response = await axiosInstance.post("/auth/onboarding", userData);
  
  return response.data
}

export const logout = async()=>{
  console.log("logout run")
   const response = await axiosInstance.post("/auth/logout");
   console.log(response)
   return response.data
}
