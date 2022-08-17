import { useContext } from "react"
import userIcon from "../../images/user-icon.png"
import ScheduleContext from "../../store/schedule-context"
import DoctorItem from "./DoctorItem"

import styles from "./DoctorItem.module.css"

export default function DoctorsList({addClass,doctorsList}){
  const {activeDoctor, updateActiveDoctor} = useContext(ScheduleContext)

  return (
    <div className={`${addClass} ${styles.list}`}>
      {doctorsList.map(item=>{
        return <DoctorItem key={item.id} name={item.name} field={item.field} imageSrc={userIcon} 
        onClickHandler={()=>updateActiveDoctor(state=>state!==item.id ? item.id : 0)} 
        addClass={activeDoctor===item.id? styles.doctorActive : ""}/>
      })}
    </div>
  ) 
}