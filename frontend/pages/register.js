import styles from "../styles/Auth.module.css"
import useInput from "../utils/useInput"

const Register = () => 
{
  const email = useInput({ placeholder : "Introduce tu Email" , type : "email" })
  const password = useInput({ placeholder : "Introduce tu contraseña" , type : "password" })
  const userName = useInput({ placeholder : "Introduce tu nombre de usuario" })
  return (
    <div className={styles.auth}>
      <main className={styles.auth__card}>
        <div className={styles.auth__title} >
          <h1>Register</h1>
        </div>
        <form className={styles.auth__form} > 
          <h2 className={styles.auth__titleInput} >Email</h2>
          <input {...email} />
          <h2 className={styles.auth__titleInput} >Password</h2>
          <input {...password} />
          <h2 className={styles.auth__titleInput} >Username</h2>
          <input {...userName} />


        </form>
      </main>
    </div>
  )
}


export default Register