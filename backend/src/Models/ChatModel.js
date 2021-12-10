import mongoose from "mongoose"

const ChatModule = new mongoose.Schema(
  {
    users : 
    [
      {
        type : mongoose.Types.ObjectId,
        required : true,
        unique : true
      }
    ] ,
    messages : 
    [
      {
        type : mongoose.Types.ObjectId,
        ref : "messages"
      }
    ]
  }
)


export default mongoose.model("chats" , ChatModule)