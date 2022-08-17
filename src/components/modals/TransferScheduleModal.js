import {useContext, useState } from "react";
import { Modal} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions } from "../../store/alert-store";
import ScheduleContext from "../../store/schedule-context";
import TransferScheduleForm from "../forms/TransferScheduleForm";
import LoadingSpinner from "../LoadingSpinner";

export default function AddScheduleModal({show,handleClose, scheduleTime}){
  const [isLoading,setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const {updateSchedule,doctors,activeDoctor} = useContext(ScheduleContext)

  const submitHandler = (data)=>{
    setIsLoading(true)
    //Simulando processamento de dados inseridos na primeira etapa.
    setTimeout(()=>{
      const {schedules} = doctors.find(item=>item.id===activeDoctor)
      if(schedules.some(item=>item.scheduleTime===data.scheduleTime&&item.scheduleDate===data.scheduleDate)){
        dispatch(actions.createAlert({type: "error", message: "Já existe um agendamento para esse horário! Escolha outro."}))
      } else {
        updateSchedule(data)
        handleClose()
        dispatch(actions.createAlert({type: "success", message: "Transferência realizada com sucesso!"}))
      }
      setIsLoading(false)
    },2000)
  }

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transferir Agendamento</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          <TransferScheduleForm scheduleTime={scheduleTime} submitData={submitHandler}/>
        </Modal.Body>
      </Modal>
    </>
  )
}