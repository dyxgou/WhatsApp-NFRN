import mongoose from "mongoose"


const MessageSchema = new mongoose.Schema(
  {
    userId : 
    {
      type : String,
      required : true
    },
    author : 
    {
      type :  String,
      required : true,
    },
    message : 
    {
      type : String,
      required : true,
    },
    timestamp : 
    {
      type : String,
      required : true
    },
  }
)


export default mongoose.model("messages" , MessageSchema)