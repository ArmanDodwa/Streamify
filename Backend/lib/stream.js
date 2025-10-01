const {StreamChat} = require("stream-chat")

const streamClint = StreamChat.getInstance( process.env.STREAM_API_KEY,process.env.STREAM_API_SECRET)

const upsertStreamUser = async(userData)=>{
    try {
       await streamClint.upsertUser([userData])
       return userData
    } catch (error) {
        console.log("Error upserting stream user",error)
    }
}

const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.error("Error generating stream token:", error);
    throw new Error("Failed to generate stream token");
  }
};


module.exports= {upsertStreamUser, generateStreamToken}