import styles from "../CSS/Avatar.module.css"


const Avatar = ({ image = "https://i.pinimg.com/550x/4d/65/c9/4d65c9684b83553683082877295cbbb0.jpg", alt = "avatar" , onClick  }) => {
  return (
    <div className={styles.avatar} onClick={onClick} >
      <img src={image} alt={alt} className={styles.avatar__image} />
    </div>
  )
}

export default Avatar