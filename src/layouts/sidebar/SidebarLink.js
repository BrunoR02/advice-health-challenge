import styles from "./SidebarLink.module.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function SidebarButton({expand,text,addClass,imageSrc,path, onClickHandler}){
  const navigate = useNavigate()


  return (
    <div className="d-flex align-items-center mb-3">
      <Button onClick={()=>{navigate(path); onClickHandler()}} variant="light" className={addClass}>
        <img className={styles.buttonIcon} src={imageSrc} alt={text}/>
      </Button>
      {expand && <span className={`px-2 ${styles.span}`}>{text}</span>}
    </div>
  )
}