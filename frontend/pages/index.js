import styles from "../styles/Auth.module.css"
import Head from "next/head"
import useInput from "../utils/useInput"
import axios from "../utils/axios"
import { useRecoilState } from "recoil"
import { userAtom } from "../atoms/userAtoms"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Login = () => 
{
  const email = useInput({ placeholder: "Introduce tu Email", type: "email" })
  const password = useInput({ placeholder: "Introduce tu Contraseña" , type: "password" })
  const [ user , setUser ] = useRecoilState(userAtom)
  const router = useRouter()
  const isCompletedInputs = email.value && password.value

  const registerHandler = async(e) => 
  {
    e.preventDefault()

    await axios(
      {
        method : "POST",
        url : "/api/v1/auth/login",
        data : 
        {
          email : email.value,
          password : password.value
        }
      }
    ).then(res => {
      if(res.status === 200)
      {
        setUser(res.data)
      }
      return null
    }).catch(err => {
      console.log(err);
      return null
    })
  }

  useEffect(() => 
  {
    console.log(user);
    if(!!user)
    {
      router.push("/home")
    }
  } , [user])

  return (
    <div className={styles.auth}>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.auth__card}>
        <div className={styles.auth__title}>
          <h1>WhatsApp</h1>
        </div>
        <form className={styles.auth__form}>
          <h2 className={styles.auth__titleInput} >Email</h2>
          <input {...email} />
          <h2 className={styles.auth__titleInput} >Contraseña</h2>
          <input {...password} />
          
          <button className={
            isCompletedInputs ? styles.auth__buttonEnable : styles.auth__buttonDisenable
          }  disabled={!isCompletedInputs} onClick={(e) => {
            registerHandler(e)
          }} >
            Login
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login