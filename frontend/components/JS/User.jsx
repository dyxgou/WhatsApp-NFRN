import axios from "../../utils/axios";
import styles from "../CSS/User.module.css"
import Avatar from "./Avatar"
import { useRecoilValue , useSetRecoilState , useRecoilState} from "recoil";
import { getUser } from "../../atoms/userAtoms"
import { chatState } from "../../atoms/chatAtom"
import { useEffect } from "react";
import { useRouter } from "next/router"
import { contactAtom } from "../../atoms/contactAtom";


const User = ({ avatar , name="" , contactId}) =>
{
  const userData = useRecoilValue(getUser)
  const [ chat , setChat ] = useRecoilState(chatState)
  const setContact  = useSetRecoilState(contactAtom)
  const router = useRouter()

  
  const chatHandler = () => 
  {
    if(!!(contactId && userData))    
    {
      const fetchChat = async() => 
      {
        await axios(
          {
            method : "GET",
            url : "/api/v1/chat/getc",
            params : 
            {
              uOne : userData._id,
              uTwo : contactId
            } 
          }
        ).then(res => {
          if(res.status === 200)
          {
            setChat(res.data)
            setContact({
              avatar, name, contactId
            })
          }
          return null
        }).catch(err => {
          console.log(err);
          return null
        })
      }

      return fetchChat()
    }
  }

  useEffect(() => 
  {
    if(!!chat)
    {
      router.push(`/chat/${chat._id}`)      
    }
  } , [chat])

  return(
    <div className={styles.user} onClick={chatHandler} >
      <Avatar image={avatar ? avatar : "https://i.pinimg.com/550x/4d/65/c9/4d65c9684b83553683082877295cbbb0.jpg"}/>

      <div className={styles.user__textContainer}>
        <div className={styles.user__text}>
          <p className={styles.user__name} > {name} </p>
        </div>
      </div>
    </div>
  )
}


export default User