import { useState } from "react";
import { MapPin, Shuffle, ChevronDown } from "lucide-react";
import useAuthUser  from "../Hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {completonBoarding} from "../lib/app"

export default function OnboardingPage() {
  const {authUser} = useAuthUser()
  const queryClient = useQueryClient
  
  
  const [profile, setProfile] = useState({
    name:"",
    bio:authUser?.bio || "",
    nativeLanguage:authUser?.nativeLanguage || "",
    learningLanguage:authUser?.learningLanguage || "",
    location:authUser?.location || "",
    avatarUrl:authUser?.profilePic || "",
    isOnboarded:true,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateAvatar = () => {
    const newColor = profile.avatarUrl.includes("F472B6") ? "34D399" : "F472B6";
    setProfile((prev) => ({
      ...prev,
      avatarUrl: `https://placehold.co/112x112/${newColor}/1F2937?text=U`,
    }));
  };

  const {mutate:onboardingMutation, isPending} = useMutation({
    mutationFn:completonBoarding,
    onSuccess: ()=>{
      // toast.success("Profile Onboarding Complete");
      queryClient.invalidateQueries({queryKey:["authUser"]})
    },
    onError:(err)=>{
      console.log(err)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("--- Profile Submitted ---");
    // console.log(profile);
    // console.log("-------------------------");

    onboardingMutation(profile);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl p-6 sm:p-10 mt-10 mb-20">
        <h1 className="text-3xl font-extrabold text-center text-white mb-12">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-500/50 shadow-lg mb-6">
              <img
                src={profile.avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/112x112/5A5A5A/FFFFFF?text=P";
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateAvatar}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-teal-400 text-sm font-semibold rounded-full hover:bg-gray-700 transition duration-150 shadow-md"
            >
              <Shuffle className="w-4 h-4" />
              <span>Generate Random Avatar</span>
            </button>
          </div>

          <div className="mb-6 w-full">
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder={authUser?.name || ""}
              value={profile.name}
              onChange={handleChange}
              name="name"
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 placeholder-white"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Bio
            </label>
            <textarea
              placeholder="Tell others about yourself and your language learning goals"
              value={profile.bio}
              onChange={handleChange}
              name="bio"
              rows={4}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 resize-none placeholder-gray-500"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6">
            <div className="w-full sm:w-1/2 mb-6">
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Native Language
              </label>
              <div className="relative">
                <select
                  value={profile.nativeLanguage}
                  onChange={handleChange}
                  name="nativeLanguage"
                  required
                  className="appearance-none w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 pr-10 cursor-pointer"
                >
                  <option value="" disabled>
                    Select your native language
                  </option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-6">
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Learning Language
              </label>
              <div className="relative">
                <select
                  value={profile.learningLanguage}
                  onChange={handleChange}
                  name="learningLanguage"
                  required
                  className="appearance-none w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 pr-10 cursor-pointer"
                >
                  <option value="" disabled>
                    Select language you're learning
                  </option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-6 w-full">
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City, Country"
                value={profile.location}
                onChange={handleChange}
                name="location"
                className="w-full p-3 pr-10 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-500"
              />
              <MapPin className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="pt-4 mt-8">
            <button
              type="submit"
              className="w-full py-4 bg-green-500 text-black font-extrabold text-lg rounded-xl hover:bg-green-400 transition duration-200 shadow-xl shadow-green-500/30"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      <div
        id="custom-alert"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-2xl opacity-0 transition-opacity duration-300 pointer-events-none z-50"
      >
        Message will appear here
      </div>
    </div>
  );
}
