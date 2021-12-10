import styles from "../CSS/IconButton.module.css"


const IconButton = ({ Icon }) =>
{
  return(
    <div className={styles.icon} >
      <Icon className={styles.icon__button} />
    </div>
  )
}


export default IconButton
