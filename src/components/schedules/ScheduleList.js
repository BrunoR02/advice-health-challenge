import { useContext, useEffect, useState } from "react";
import ScheduleContext from "../../store/schedule-context";
import ScheduleItem from "./ScheduleItem";

import { workingTime, monthsList } from "../../helpers/variables";

import styles from "./ScheduleList.module.css"

export default function ScheduleList({currentDoctor,currentDate}){
  const {day,month,year} = currentDate
  const [formatedDate, setFormatedDate] = useState(`${day}-${month+1}-${year}`)
  const [scheduleList,setScheduleList] = useState([])
  const {doctors,activeDoctor} = useContext(ScheduleContext)

  //Selecionar schedules do Medico(doctor) selecionado
  useEffect(()=>{
    if(doctors && currentDoctor){
      let {schedules} = doctors.find(item=>item.id===currentDoctor.id)
      setScheduleList(schedules)
    }
  },[doctors,currentDoctor])

  useEffect(()=>{
    setFormatedDate(`${day}-${month+1}-${year}`)
  },[day,month,year])

  return (
    <div>
      <h5 className="mt-3 mx-5">{day}/{monthsList[month]}/{year}</h5>
      {activeDoctor !== 0 && <ul className={styles.list}>
        {workingTime.map((time)=>{
          return <ScheduleItem key={time} data={scheduleList && (scheduleList.find(item=>(item.scheduleTime===time && item.scheduleDate === formatedDate)) || null)} time={time}/>
        })}
        </ul>}
      {activeDoctor === 0 && <div>
        <h3 className={styles.noSelectText}>Selecione um médico para ver sua agenda</h3>
        </div>}
      
    </div>
  )
}