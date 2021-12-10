import styles from "../CSS/Sidebar.module.css"
import Avatar from "./Avatar"
import { PlusIcon, DotsHorizontalIcon, ViewGridAddIcon, SearchIcon } from "@heroicons/react/solid"
import IconButton from "./IconButton"
import useInput from "../../utils/useInput"
import User from "./User"
import { useRecoilState, useRecoilValue , useResetRecoilState } from "recoil"
import { getUser , userAtom } from "../../atoms/userAtoms"
import { contactsAtoms } from "../../atoms/contactsAtoms"
import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "../../utils/axios"


const Sidebar = () => {
  const search = useInput({ placeholder: "Busca un chat o contacto" })
  const userData = useRecoilValue(getUser)
  const [ contacts , setContacts ] = useRecoilState(contactsAtoms)
  const router = useRouter()
 
  useEffect(() => 
  {
    console.log("Feching the users...");
    if(!!userData)
    {
      console.log(userData);
      const fetchContacts = async() => 
      {
        await axios(
          {
            method : "GET",
            url : `/api/v1/user/getc/${userData._id}`
          }
        ).then(res => {
          if(res.status === 200)
          {
            console.log(res.data.contacts);
            setContacts(res.data.contacts)
          }
          return null
        }).catch(err => {
          console.log(err);
          return null
        })
      }

      return fetchContacts()
    }
    else
    {
      router.push("/")
    }
    console.log(contacts);
  } , [userData])

  const logout = useResetRecoilState(userAtom)

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}  >
        <Avatar image={userData?.avatar} onClick={logout} />


        <div className={styles.sidebar__icons}>
          <IconButton Icon={ViewGridAddIcon} />
          <IconButton Icon={PlusIcon} />
          <IconButton Icon={DotsHorizontalIcon} />
        </div>
      </div>

      <div className={styles.sidebar__search}>
        <div className={styles.sidebar__searchContainer}>
          <IconButton Icon={SearchIcon} />
          <input {...search} />
        </div>
      </div>

      <div className={styles.sidebar__users}>
        {
          contacts.map(contact => 
            {
              return (
                <User 
                  contactId={contact._id}
                  key={contact._id}
                  avatar={contact.avatar}
                  name={contact.name}
                />
              )
            }
          )
        }
      </div>
    </div>
  )
}


export default Sidebar