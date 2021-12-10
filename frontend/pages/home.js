import Sidebar from "../components/JS/Sidebar"
import styles from "../styles/Home.module.css"

const Home = () =>
{
  return ( 
    <div className={styles.home} >
      {/* Sidebar */}
      <Sidebar />
      {/* Chat */}
    </div>
  )
}


export default Home