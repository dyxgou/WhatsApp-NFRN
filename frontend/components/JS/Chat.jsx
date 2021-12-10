import styles from "../CSS/Chat.module.css"
import Avatar from "./Avatar"
import IconButton from "./IconButton"
import { SearchIcon , DotsHorizontalIcon , EmojiHappyIcon , PaperClipIcon , MicrophoneIcon  } from "@heroicons/react/outline"
import useInput from "../../utils/useInput"
import Message from "./Message"
import { useRecoilState, useRecoilValue } from "recoil"
import { getContact } from "../../atoms/contactAtom"
import { messageAtom } from "../../atoms/messageAtoms"
import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "../../utils/axios"
import { useRef } from "react"
import Head from "next/head"

const Chat = () =>
{
  const chat = useInput({ placeholder : "Send message" })
  const contactData = useRecoilValue(getContact)
  const router = useRouter()
  const messageRef = useRef()
  const [ messages , setMessages ] = useRecoilState(messageAtom)
  
  const fetchMessages = async(chatId) => 
  {
    await axios(
      {
        method : "GET",
        url : `/api/v1/chat/getm/${chatId}`,
      }
    ).then(res => {
      if(res.status === 200)
      {
        setMessages(res.data.messages)
        console.log(messages);
      }
      return null
    }).catch(err => {
      console.log(err);
      return null
    })
  }


  useEffect(() => 
  {
    if(!!contactData)
    {
      fetchMessages(router.query.id)
    }
  } , [contactData])

  useEffect(() => 
  {
    messageRef.current?.scrollIntoView({ behavior : "smooth" })
  } , [messages])


  const sendMessage = async(value) => 
  {
    if(!!value)
    {
      await axios(
        {
          method : "PUT",
          url : `/api/v1/chat/${router.query.id}`,
          data : 
          {
            message : value,
            author : "",
            userId : ""
          }
        }
      )
    }
    else
    {
      return null
    }
  }

  return(
    <div className={styles.chat} >
      <Head>
        <title>Chat with {contactData?.name} </title>
      </Head>
      {/* Header */}
      <div className={styles.chat__header}>
        <div className={styles.chat__avatar}>
          <Avatar image={contactData?.avatar} />
          <div className={styles.chat__headerText} >
            <p> {contactData?.name} </p>
          </div>
        </div>

        <div className={styles.chat__headerIcons}>
          <IconButton Icon={SearchIcon} />
          <IconButton Icon={DotsHorizontalIcon} />
        </div>
      </div>
      {/* Chat Body */}
      <main className={styles.chat__body}>
        {
          messages.map(message => 
            {
              return (
                <div ref={messageRef}>
                  <Message 
                    key={message?._id}
                    message={message?.message}
                    author={message?.author}
                    timestamp={message?.timestamp}
                    received={message?.userId !== contactData.contactId}
                  />
                </div>
              )
            }
          )
        }

      </main>
      {/* Chat input */}
      <div className={styles.chat__inputContainer}>
        <form className={styles.chat__iconsContainer} onSubmit={(e) => {
          e.preventDefault()
          sendMessage(chat.value)
        }}>
          <IconButton Icon={EmojiHappyIcon} />
          <IconButton Icon={PaperClipIcon}/> 
          <input {...chat} />
          <IconButton Icon={MicrophoneIcon} />        
        </form>
      </div>
    </div>
  )
}


export default Chat