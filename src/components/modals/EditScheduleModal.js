import { useContext,useState } from "react";
import { Modal} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions } from "../../store/alert-store";
import ScheduleContext from "../../store/schedule-context";
import ScheduleForm from "../forms/ScheduleForm";
import LoadingSpinner from "../LoadingSpinner";

export default function AddScheduleModal({show,handleClose, scheduleTime}){
  const [isLoading,setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const {updateSchedule} = useContext(ScheduleContext)

  const submitHandler = (data)=>{
    setIsLoading(true)
    //Simulando processamento de dados inseridos na primeira etapa.
    setTimeout(()=>{
      updateSchedule(data)
      handleClose()
      dispatch(actions.createAlert({type: "success", message: "Agendamento editado com sucesso!"}))
      setIsLoading(false)
    },2000)
  }

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Agendamento</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          <ScheduleForm isEditing={true} scheduleTime={scheduleTime} submitData={submitHandler}/>
        </Modal.Body>
      </Modal>
    </>
  )
}