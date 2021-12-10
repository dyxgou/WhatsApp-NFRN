import styles from "../CSS/Message.module.css"
import { format } from "timeago.js"


const Message = ({ message="" , timestamp=0 , author="" , received=false , }) =>
{
  return(
    <div className={`${styles.message} ${received && styles.message__received}`}  >
      <span className={styles.message__author} >{author}</span>
      <p className={styles.message__content}>{message}</p>
      <span className={styles.message__timestamp}>{format(timestamp)}</span>
    </div>
  )
}


export default Message