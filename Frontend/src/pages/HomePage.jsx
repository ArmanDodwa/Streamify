import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { UsersIcon } from "../components/Icon/icon";
import { useQueryClient, useQuery, useMutation  } from "@tanstack/react-query";
import {getFriends,getRecommendedUser, getOutgoingFriendReq, sendFriendReqs } from "../lib/app"
import useAuthUser from "../Hooks/useAuthUser";

export default function App() {

const {isLoading, authUser} = useAuthUser();
console.log("++++-+++-++++-+++***",authUser.name)
  const queryClient = useQueryClient();


  const { data:friend=[], isloading:loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
    retry: false,
  });
  
  const { data:recommendedUser=[], isloading:loadingRecommendedUser } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUser,
    retry: false,
   
  });

  

  const { data:outgoingFriendReq=[], isloading:loadingOutgoingFriendReq } = useQuery({
    queryKey: ["outgoingFriendReq"],
    queryFn: getOutgoingFriendReq,
    retry: false,
   
  });

  const{mutation:sendFriendReqsMutation, isPending} = useMutation ({
    mutationFn:sendFriendReqs,
    onSuccess:()=>{
      console.log("sendFriendReqsMutation run");
      queryClient.invalidateQueries({queryKey:["outgoingFriendReq"]})
    }
  })

  // useEffect({

  // },[outgoingFriendReq])
console.log("+++++++++++++++++++++++++++++++++++++++++")
console.log(friend)
console.log("////////////////////////////////",outgoingFriendReq.data);
if (outgoingFriendReq.data && outgoingFriendReq.data.length > 0) {
  console.log("Recipient:", outgoingFriendReq.data[0].recipient);
}





  // ✅ Data
  const friends = [
    {
      name: "Burak Örkmez",
      location: "Istanbul, Turkey",
      nativeLang: "Spanish",
      learningLang: "English",
      isFriend: true,
    },
    {
      name: "Beth Doe",
      location: "Munich, Germany",
      nativeLang: "Portuguese",
      learningLang: "Spanish",
      isFriend: true,
    },
  ];

  const [requestStatus, setRequestStatus] = useState(
    recommendedUser.map(() => false)
  );

  const handleSendRequest = (index) => {
    const newStatus = [...requestStatus];
    newStatus[index] = true;
    setRequestStatus(newStatus);
    sendFriendReqs(
    { requestedUserId: recommendedUser[index]._id })
  };

  // ✅ Return JSX
 return (
  <div className="flex h-screen bg-gray-900 font-['Inter',_sans-serif]">
    <Sidebar />
    <div className="flex flex-col flex-1 overflow-hidden">
      <Navbar />
      <main className="flex-1 p-8 overflow-y-auto bg-gray-900">
        {/* --- Badge Component (Inline) --- */}
        {/* We'll use this inside cards. No separate const outside App. */}

        {/* --- Friends Section --- */}
        <h1 className="text-3xl font-bold mb-8 text-gray-100">Your Friends</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:bg-gray-700/50 transition-colors duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                  src={friend.profilePic || `https://placehold.co/48x48/1f2937/ffffff?text=${friend.name
                    .split(" ")[0][0]
                    .toUpperCase()}${friend.name.split(" ")[1] ? friend.name.split(" ")[1][0].toUpperCase() : ""}`}
                  alt={friend.name}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{friend.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{friend.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                  <span className="mr-1">Native:</span>
                  {friend.nativeLanguage}
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white">
                  <span className="mr-1">Learning:</span>
                  {friend.learningLanguage}
                </span>
              </div>

              <button className="mt-2 w-full bg-gray-600 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors shadow-lg">
                Message
              </button>
            </div>
          ))}
        </div>

        {/* --- Recommended Users Section --- */}
        <h2 className="text-3xl font-bold mb-2 text-gray-100">Meet New Learners</h2>
        <p className="text-gray-400 mb-8">
          Discover perfect language exchange partners based on your profile
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedUser.map((user, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:bg-gray-700/50 transition-colors duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                  src={user.profilePic || `https://placehold.co/48x48/1f2937/ffffff?text=${user.name
                    .split(" ")[0][0]
                    .toUpperCase()}${user.name.split(" ")[1] ? user.name.split(" ")[1][0].toUpperCase() : ""}`}
                  alt={user.name}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{user.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                  <span className="mr-1">Native:</span>
                  {user.nativeLanguage}
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white">
                  <span className="mr-1">Learning:</span>
                  {user.learningLanguage}
                </span>
              </div>

              {user.bio && (
                <p className="text-sm text-gray-400 mb-4 italic line-clamp-2">"{user.bio}"</p>
              )}

              {requestStatus[index] ? (
                <button
                  disabled
                  className="mt-2 w-full bg-gray-500 text-white font-medium py-3 rounded-xl cursor-not-allowed shadow-lg"
                >
                  ✅ Request Sent
                </button>
              ) : (
                <button
                  onClick={() => handleSendRequest(index)}
                  className="mt-2 w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-500 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <UsersIcon className="h-4 w-4" />
                  Send Friend Request
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
);

}
