import React from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getFriendsRequests, acceptReqs } from "../lib/app";
import Sidebar from "../components/Sidebar";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendsRequests, isLoading, isError } = useQuery({
    queryKey: ["friendsRequests"],
    queryFn: getFriendsRequests,
    retry: false,
  });

  const { mutate: acceptReqsMutation, isPending } = useMutation({
    mutationFn: acceptReqs,
    onSuccess: () => {
      console.log("acceptReqsMutation run");
      queryClient.invalidateQueries({ queryKey: ["friendsRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  if (isLoading)
    return (
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-red-500">
          Error fetching requests
        </div>
      </div>
    );

  const incomingRequest = friendsRequests?.incoming || [];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>

        {incomingRequest.length === 0 ? (
          <p className="text-gray-400">No new friend requests.</p>
        ) : (
          <div className="space-y-4">
            {incomingRequest.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                {/* Sender Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={req.sender.profilePic}
                    alt={req.sender.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-700"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{req.sender.name}</h2>
                    <p className="text-sm text-gray-400">
                      {req.sender.nativeLanguage} → {req.sender.learningLanguage}
                    </p>
                    <p className="text-xs text-gray-500">
                      Sent at: {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Accept Button */}
                <button
                  onClick={() => acceptReqsMutation(req._id)}
                  disabled={isPending}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
                >
                  {isPending ? "Accepting..." : "Accept"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
