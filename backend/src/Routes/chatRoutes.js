import createUrl from "../Utils/createUrl.js"
import ChatModel from "../Models/ChatModel.js"
import MessageModel from "../Models/MessageModel.js"

const url = createUrl("chat")

const routes = 
[
  // Get Chat
  {
    method : "GET",
    url : `${url}/getc`,
    handler : async(request , reply) => 
    {
      const { uOne , uTwo } = request.query

      if(!(uOne , uTwo))
      {
        return reply.status(404).send("Query params not found")
      }

      await ChatModel.findOne(
        {
          $or : 
          [
            { users : [ uOne , uTwo ] },
            { users : [ uTwo , uOne ] }
          ]
        }
      ).then(chatData => {
        if(!chatData)
        {
          return reply.status(404).send("Chat not found")
        }

        return reply.status(200).send(chatData)
      }).catch(err => {
        return reply.status(400).send(err)
      }) 
    }
  },
  // Put a message
  {
    method : "PUT",
    url : `${url}/text/:id`,
    handler : async(request , reply) => 
    {
      const { id : chatId } = request.params

      const { userId , author , message  } = request.body

      if(!(userId || author || message ))
      {
        return reply.status(404).send("Message info not found")
      }

      const timestamp = Date.now()

      const chat = await ChatModel.findById(chatId , {
        _id : true , messages : true
      }).catch(err => {
        return reply.status(400).send(err)
      })

      if(!chat)
      {
        return reply.status(404).send("Chat not found")
      }

      const newMessage = await MessageModel.create({
        userId , author , message , timestamp
      }).catch(err => {
        return reply.status(400).send(err)
      })

      chat.updateOne(
        {
          $push : 
          {
            messages : newMessage._id 
          }
        }
      ).then(() => {
        return reply.status(202).send(newMessage)
      }).catch(err => {
        return reply.status(400).send(err)
      })
    }
  },
  // Get messages 
  {
    method : "GET",
    url : `${url}/getm/:id`,
    handler : async(request , reply) =>
    {
      const { id : chatId } = request.params

      if(!chatId)
      {
        return reply.status(404).send("Chat id not found")
      }

      await ChatModel.findById(chatId , {
        _id : false , messages : true
      }).populate("messages").then(messageData => {
        if(!messageData)
        {
          return reply.status(404).send("Messages not found")
        }

        return reply.status(200).send(messageData)
      }).catch(err => {
        return reply.status(400).send(err)
      })
    }
  }
]


export default routes