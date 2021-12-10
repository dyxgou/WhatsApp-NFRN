import createUrl from "../Utils/createUrl.js"
import UserModel from "../Models/UserModel.js"
import ChatModel from "../Models/ChatModel.js"

const url = createUrl("user")

const routes = 
[
  // Send a contact Request 
  {
    method : "PUT",
    url : `${url}/send/:id`,
    handler : async(request , reply) => 
    {
      const { id : userIdContacted } = request.params
      const { userNameToAdd } = request.body

      if(!(userIdContacted || userNameToAdd))
      {
        return reply.status(404).send("userNameToAdd or userIdContacted not found")
      }

      const userContacted = await UserModel.findById(userIdContacted ,{
        _id : true , contacts : true , contactsRequest : true , contactsPending : true
      }).catch(err => {
        return reply.status(400).send(err)
      })

      const userToAdd = await UserModel.findOne({ name : userNameToAdd } , {
        _id : true , contacts : true , contactsRequest : true , contactsPending : true
      }).catch(err => {
        return reply.status(400).send(err)
      })

      if(!(userContacted || userToAdd))
      {
        return reply.status(404).send("Users not found")
      }
      
      if(userContacted.id === userToAdd.id)
      {
        return reply.status(401).send("You can't add yourself")
      }

      const isAdded = (user , userId) => 
      {
        const { contacts , contactsRequest , contactsPending } = user

        return contacts.includes(userId) || contactsRequest.includes(userId) || contactsPending.includes(userId)
      }

      if(isAdded(userContacted , userToAdd.id) || isAdded(userToAdd , userContacted.id) )
      {
        return reply.status(401).send("The users has been added lately")
      }

      await userContacted.updateOne({
        $push : 
        {
          contactsRequest : userToAdd._id 
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })


      await userToAdd.updateOne({
        $push : 
        {
          contactsPending : userContacted._id
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })


      return reply.status(200).send("User request has been sent")
    }
  },
  // Reject a contact request
  {
    method : "PUT",
    url :`${url}/reject/:id`,
    handler : async(request , reply) => 
    {
      const { id : userIdRejecting } = request.params
      const { userIdToReject } = request.body

      if(!(userIdRejecting || userIdToReject))
      {
        return reply.status(400).send("UserRejecting or userToReject not found")
      }
      
      await UserModel.findById(userIdRejecting , {
        contactsPending : true , _id : false
      }).then(userData => {
        if(!userData.contactsPending.includes(userIdToReject))
        {
          return reply.status(404).send("User to reject not found")
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })

      await UserModel.findById(userIdToReject , {
        contactsRequest : true , _id : false
      }).then(userData => {
        if(!userData.contactsRequest.includes(userIdRejecting))
        {
          return reply.status(404).send("Contact to reject not found")
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })
      
      await UserModel.findByIdAndUpdate(userIdRejecting , {
        $pull : 
        {
          contactsPending : userIdToReject
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })
      await UserModel.findByIdAndUpdate(userIdToReject , {
        $pull : 
        {
          contactsRequest : userIdRejecting
        }
      }).catch(err => {
        return reply.status(400).send(err)
      })


      return reply.status(200).send("The contacts request has been rejected")
    }
  },
  // Accept contact request
  {
    method : "PUT",
    url : `${url}/accept/:id`,
    handler : async(request , reply) => 
    {
      const { id : userIdAccepting } = request.params
      const { userIdToBeAccepted } = request.body

      if(!(userIdAccepting || userIdToBeAccepted))
      {
        return reply.status(404).send("userAccepting or userToBeAccepted not found")
      }

      if(userIdAccepting === userIdToBeAccepted)
      {
        return reply.status(400).send("You can't add yourself")
      }

      const userAccepting = await UserModel.findById(userIdAccepting , {
        contactsPending : true , contacts : true
      }).catch(err => {
        return reply.status(400).send(err)
      })

      const userToBeAccepted = await UserModel.findById(userIdToBeAccepted , {
        contactsRequest : true , contacts : true
      }).catch(err => {
        return reply.status(400).send(err)
      })

      if(!(userToBeAccepted.contactsRequest.includes(userIdAccepting) || userAccepting.contactsPending.includes(userIdToBeAccepted)))
      {
        return reply.status(404).send("Contacts to be added not found")
      }

      if(!(userAccepting || userToBeAccepted))
      {
        return reply.status(404).send("Users not found")
      }

      const chatCreated = await ChatModel.create({
        users : [
          userIdAccepting , userIdToBeAccepted
        ]
      }).catch(err => {
        return reply.status(400).send(err)
      })

      await userAccepting.updateOne(
        {
          $push : 
          {
            contacts :userIdToBeAccepted,
            chats : [
              chatCreated.users
            ]
          },
          $pull: 
          {
            contactsPending : userIdToBeAccepted
          }
        }
      ).catch(err => {
        return reply.status(400).send(err)
      })

      await userToBeAccepted.updateOne(
        {
          $push : 
          {
            contacts : userIdAccepting,
            chats : [
              chatCreated.users
            ]
          }, 
          $pull : 
          {
            contactsRequest : userIdAccepting
          }
        }
      ).catch(err => {
        return reply.status(400).send(err)
      })


      return reply.status(200).send("The contact request has been accepted")
    }
  },
  // Get all contacts
  {
    method : "GET",
    url : `${url}/getc/:id`,
    handler : async(request , reply) => 
    {
      const { id : userId } = request.params

      await UserModel.findById(userId , {
        _id : false , contacts : true
      }).populate("contacts" , {
        avatar : 1 , name : 1 
      }).then(contactData => {
        return reply.status(200).send(contactData)
      }).catch(err => {
        return reply.status(400).send(err)
      })
    }
  },
  
]


export default routes