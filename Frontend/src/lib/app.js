import { axiosInstance } from "./axios";

export const singup = async (singupData) => {
  const response = await axiosInstance.post("/auth/signup", singupData);
  console.log(response.data);
};
export const login = async (singupData) => {
  console.log(singupData);
  const response = await axiosInstance.post("/auth/login", singupData);
  console.log(response.data);
  console.log(response.data);
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completonBoarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);

  return response.data;
};

export const logout = async () => {
  console.log("logout run");
  const response = await axiosInstance.post("/auth/logout");
  console.log(response);
  return response.data;
};

export const getFriends = async () => {
  console.log("getFriends run");
  const response = await axiosInstance.get("/users/friends");
  // console.log("getFriends run",response);
  // console.log("getFriends run",response.data);
  return response.data;
};


export const getRecommendedUser = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
export const getOutgoingFriendReq = async () => {
  console.log("getOutgoingFriendReq run");
  const response = await axiosInstance.get("/users/outgoing-friends-request");
  // console.log("getOutgoingFriendReq run ++++",response);
  return response.data;
};

export const sendFriendReqs = async(reqUser)=>{
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.log("sendFriendReqs run");
 
  const response = await axiosInstance.post(`/users/friends-request/${reqUser.requestedUserId}`);
  console.log("sendFriendReqs run",response);
  return response.data;
}


export const getFriendsRequests = async()=>{
  console.log("getFriendsRequests run");
 
  const response = await axiosInstance.get(`/users/friends-requests`);
  console.log("sendFriendReqs run",response.data);
  return response.data;
}

export const acceptReqs = async(reqUser)=>{
  console.log("acceptReqs run");
 
  const response = await axiosInstance.put(`/users/friends-request/${reqUser}/accept`);
  console.log("sendFriendReqs run",response);
  return response.data;
}
