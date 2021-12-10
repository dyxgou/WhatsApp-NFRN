import mongoose from "mongoose"


const UserSchema = new mongoose.Schema(
  {
    name : 
    {
      required :  true,
      type : String,
      min : 3
    },
    email :
    {
      type : String,
      required : true,
      unique : true,
      min : 5
    },
    password : 
    {
      type : String,
      required : true,
    },
    avatar : 
    {
      type : String,
      default : ""
    },
    contacts : 
    [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
      }
    ],
    chats : 
    {
      type : Array,
      default : []
    },
    contactsRequest : 
    [
      {
        type : String,
        unique : true
      }
    ],
    contactsPending : 
    [
      {
        type : String,
        unique : true
      }
    ],
    isAdmin : 
    {
      type : Boolean,
      default : false
    },
  }, 
  {
    timestamps : true
  }
)


export default mongoose.model("users" , UserSchema)