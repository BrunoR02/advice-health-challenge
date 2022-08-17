import styles from "./Header.module.css"
import Image from 'react-bootstrap/Image'
import userIcon from "../images/user-icon.png"

export default function Header(){
  return (
  <header className={styles.header}>
    <h2 className={styles.title}>Advice Health</h2>
    <div className={styles.profile}>
      <Image className={styles.icon} src={userIcon} roundedCircle />
      <h5 className={styles.name}>Bruno</h5>
    </div>
  </header>
  )
}