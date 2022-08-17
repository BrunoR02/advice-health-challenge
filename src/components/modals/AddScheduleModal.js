import { useContext, useEffect, useState } from "react";
import { Modal} from "react-bootstrap";
import { useDispatch} from "react-redux";
import { actions } from "../../store/alert-store";
import ScheduleContext from "../../store/schedule-context";
import PaymentForm from "../forms/PaymentForm";
import ScheduleForm from "../forms/ScheduleForm";
import LoadingSpinner from "../LoadingSpinner";

//Aqui é onde é realizado o cadastro de Agendamentos(Schedules). Primeiro 
//passa pelo Form de Dados do Cliente(step=1), depois passa pelo Form de Pagamento(step=2)

export default function AddScheduleModal({show,handleClose, scheduleTime}){
  const [step,setStep] = useState(1)
  const [scheduleData, setScheduleData] = useState({})
  const [isLoading,setIsLoading] = useState(false)

  const dispatch = useDispatch()
  
  const {addSchedule} = useContext(ScheduleContext)

  const nextStep = () =>{
    setIsLoading(true)
    //Simulando processamento de dados inseridos na primeira etapa.
    setTimeout(()=>{
      setStep(state=>state+1)
      if(step===2) {
        handleClose()
        //Notificação
        dispatch(actions.createAlert({type: "success", message: "Agendamento realizado com sucesso!"}))
      }
      setIsLoading(false)
    },2000)
  }

  useEffect(()=>{
    //Após adicionar informações de pagamento ao agendamento referente.
    if(scheduleData.payment){
      //Guardar dados do agendamento no redux-store
      addSchedule(scheduleData)
    }
  },[addSchedule,scheduleData,step,dispatch])

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{step===1 ? "Formulário de" : "Pagamento do"} Agendamento</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          {/*Form de Dados do Cliente (1/2) */}
          {step===1 && <ScheduleForm isEditing={false} scheduleTime={scheduleTime} submitData={(data)=>{setScheduleData(data); nextStep()}}/>}
          {/*Form de Pagamento após inserir dados do cliente (2/2) */}
          {step===2 && <PaymentForm submitData={(paymentInfo)=>{setScheduleData(obj=>({...obj,payment: paymentInfo}));nextStep()}} onBackStep={()=>setStep(state=>state-1)}/> }       
        </Modal.Body>
      </Modal>
    </>
  )
}