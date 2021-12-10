import UserModel from "../Models/UserModel.js"
import createUrl from "../Utils/createUrl.js"
import  * as bcrypt from "bcrypt"
const url = createUrl("auth")

const routes = [
  // Register an user
  {
    method : "POST",
    url : `${url}/register`,
    handler : async(request , reply) =>
    {
      const userInfo = request.body

      if(!userInfo.email || !userInfo.password || !userInfo.name) 
      {
        return reply.status(400).send("We lack information")
      }
      
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userInfo.password , salt)

      userInfo.password = hashedPassword

      await UserModel.create(userInfo).then(newUser => {
        return reply.status(202).send(newUser)
      }).catch(err => {
        return reply.status(400).send(err)
      })
    },
  },

  // Login of the user
  {
    method : "POST",
    url : `${url}/login`,
    handler : async(request , reply) => 
    {
      const userInfo = request.body

      if(!userInfo.email , !userInfo.password)
      {
        return reply.status(400).send("We lack information")
      }

      await UserModel.findOne({ email : userInfo.email }).then((userData) => {
        if(!userData) 
        {
          return reply.status(404).send("User not found")
        }
        bcrypt.compare(userInfo.password , userData.password).then((validated) => {
          if(!validated) return reply.status(400).send("wrong password")

          return reply.status(200).send(userData)
        }).catch(err => {
          return reply.status(400).send(err)
        })

      }).catch(err => {
        return reply.status(400).send(err)
      })
    }

  },
  // Update an user
  {
    method : "PUT",
    url : `${url}/update/:id`,
    handler : async(request ,  reply) =>
    {
      const userInfoToUpdate = request.body
      
      
      if(userInfoToUpdate.userId !== request.params.id)
      {
        return reply.status(400).send("You can't update this user")
      }
      

      if(userInfoToUpdate.password)
      {
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(userInfoToUpdate.password , salt)

        userInfoToUpdate.password = hashedNewPassword
      }

      await UserModel.findByIdAndUpdate(request.params.id , 
        {
          $set  : userInfoToUpdate
        }
      ).then(() =>{
        return reply.status(200).send("User has been updated")
      }).catch(err =>{
        return reply.status(400).send(err)
      })
    }
  }, 
  // Delete an user
  {
    method : "DELETE",
    url : `${url}/delete/:id`,
    handler : async(request , reply) =>
    {
      if(request.body.isAdmin)
      {
        await UserModel.findByIdAndDelete(request.params.id).then(() => {
          return reply.status(202).send("User has been deleted")
        }).catch(err => {
          return reply.status(400).send(err)
        })
      }
    }
  }
]


export default routes