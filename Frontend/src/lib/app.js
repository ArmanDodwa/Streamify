import {axiosInstance} from "./axios"

export const singup = async (singupData) => {
  const response = await axiosInstance.post("/auth/signup", singupData);
  console.log(response.data)
};
