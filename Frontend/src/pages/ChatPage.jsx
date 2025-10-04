import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../Hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/app";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch token
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    retry: false,
  });

  console.log("+++++++++",tokenData?.token)

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing chat...");

        // ✅ Create Stream Chat instance
        const client = StreamChat.getInstance(STREAM_API_KEY);

        // ✅ Connect user
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.name,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        // ✅ Generate a stable channel ID (sorted)
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // ✅ Create or get channel
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        // ✅ Save states
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Chat page error:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // ✅ Cleanup on unmount
    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [tokenData, authUser, targetUserId]); // ✅ Add dependency array

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-screen flex flex-col">
      <Chat client={chatClient} theme="messaging light" >
        <Channel channel={channel} >
          <Window >
            <ChannelHeader />
            <MessageList />
            <MessageInput placeholder="Type your message..." />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
