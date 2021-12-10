import styles from "../../styles/Id.module.css"
import Sidebar from "../../components/JS/Sidebar"
import Chat from "../../components/JS/Chat"

const UserChat = () => 
{
  return (
    <div className={styles.userChat} >
      {/* Sidebar */}
      <Sidebar />      
      {/* Chat */}
      <Chat />      
    </div>
  )
}

export default UserChat