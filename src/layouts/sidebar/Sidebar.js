import { useState } from "react"
import SidebarLink from "./SidebarLink"

import styles from "./Sidebar.module.css"
import { Button } from "react-bootstrap"

import arrowIcon from "../../images/arrow.png"
import dashboardIcon from "../../images/dashboard.png"
import scheduleIcon from "../../images/schedule.png"
import searchIcon from "../../images/search.png"

export default function Sidebar(){
  const [expand, setExpand] = useState(false)
  const [activeTarget,setActiveTarget] = useState(0)
  
  let expandClass = expand ? styles.expand : "";

  return (
    <div className={`${styles.container} ${expandClass}`}>
      <nav className="navbar navbar-light flex-md-column d-flex align-items-start m-2">  
        <Button
          variant="white" 
          className={`mb-3 ${expand ? `${styles.active} align-self-end` : ""}`} 
          style={{outline: "0", border: "0em"}} 
          onClick={()=>{setExpand(state=>!state)}}>
            <img style={{width: "25px"}} src={arrowIcon} alt="arrow"/>
        </Button>
        <SidebarLink expand={expand} text="Dashboard" addClass={activeTarget === 1 ? styles.linkActive : ""}
          imageSrc={dashboardIcon} path="/" onClickHandler={()=>{setActiveTarget(1); setExpand(false)}}/>
        <SidebarLink expand={expand} text="Agendamento de Consulta" addClass={activeTarget === 2 ? styles.linkActive : ""}
          imageSrc={scheduleIcon} path="/agendamento" onClickHandler={()=>{setActiveTarget(2); setExpand(false)}}/>
        <SidebarLink expand={expand} text="Consulta de Agendamentos" addClass={activeTarget === 3 ? styles.linkActive : ""}
          imageSrc={searchIcon} path="/consulta" onClickHandler={()=>{setActiveTarget(3); setExpand(false)}}/>
      </nav>
    </div>
  ) 
}