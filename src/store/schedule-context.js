import { createContext, useCallback, useState } from "react";

const ScheduleContext = createContext({
  doctors: [],
  addSchedule: (data)=>{},
  removeSchedule: (data)=>{}
})

const DUMMY_LIST = [
  {
    id: 1,
    name: "João Carlos",
    field: "Ginecologista",
    schedules: [{
      id: Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase(),
      name: "Lucas",
      ref: 1,
      cpf: "074.074.084-23",
      birthDate: "1999-02-12",
      address: "Rua Rua",
      addressNum: parseInt("233"),
      addressBairro: "Rosa elze",
      addressComp: "",
      observation: "",
      status: "Pago",
      scheduleTime: "09:30",
      scheduleDate: "17-8-2022",
    }]
  }, 
  {
    id: 2,
    name: "Eduardo Gomes",
    field: "Dentista",
    schedules: []
  },
  {
    id: 3,
    name: "Carla Nascimento",
    field: "Pediatra",
    schedules: [{
      id: Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase(),
      name: "Jon",
      ref: 3,
      cpf: "074.074.084-23",
      birthDate: "1999-02-12",
      address: "Rua Rua",
      addressNum: parseInt("233"),
      addressBairro: "Rosa elze",
      addressComp: "",
      observation: "",
      status: "Pago",
      scheduleTime: "09:30",
      scheduleDate: "17-8-2022",
    }]
  },
  {
    id: 4,
    name: "Lucas Xavier",
    field: "Dermatologista",
    schedules: []
  }
]

export function ScheduleContextProvider({children}){
  const [doctors,setDoctorSchedule] = useState(DUMMY_LIST)
  const [activeDoctor,setActiveDoctor] = useState(0)

  const addSchedule = useCallback((data) =>{
    setDoctorSchedule(prevState=>{
      return prevState.map(item=>{
        if(item.id===activeDoctor){
          return {...item, schedules: [...item.schedules, data]}
        }
        return item
      })
    })
  },[activeDoctor])

  const removeSchedule = (data) =>{
    setDoctorSchedule(prevState=>{
      return prevState.map(item=>{
        if(item.id===activeDoctor){
          const newSchedules = item.schedules.filter(schedule=>(schedule.id!==data.id))
          return {...item, schedules: newSchedules}
        }
        return item
      })
    })
  }

  const updateSchedule = (data) =>{
    setDoctorSchedule(prevState=>{
      return prevState.map(item=>{
        if(item.id===activeDoctor){
          let filteredSchedules = item.schedules.map(schedule=>{
            if(schedule.id===data.id){
              return {...schedule,...data}
            } else {
              return schedule
            }
          })
          return {...item, schedules: filteredSchedules}
        }
        return item
      })
      
    })
  }

  const context = {
    doctors,
    activeDoctor,
    addSchedule,
    removeSchedule,
    updateSchedule,
    updateActiveDoctor: (value)=>{setActiveDoctor(value)},
  }

  return (
    <ScheduleContext.Provider value={context}>
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleContext