import {useContext, useState } from "react";
import { Button, Col, Modal, Row} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { monthsList } from "../../helpers/variables";
import { actions } from "../../store/alert-store";
import ScheduleContext from "../../store/schedule-context";
import LoadingSpinner from "../LoadingSpinner";

export default function AddScheduleModal({show,data, handleClose}){
  const [isLoading,setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const {removeSchedule,doctors,activeDoctor} = useContext(ScheduleContext)
  const doctor = doctors.find(item=>item.id===activeDoctor)

  const submitHandler = ()=>{
    setIsLoading(true)
    //Simulando processamento de dados inseridos na primeira etapa.
    setTimeout(()=>{
      removeSchedule(data)
      handleClose()
      dispatch(actions.createAlert({type: "success", message: "Consulta cancelada com sucesso!"}))
      setIsLoading(false)
    },2000)
  }

  let dateList = data ? data.scheduleDate.split("-") : ""
  let formatedMonth = monthsList[+dateList[1]-1]
  let formatedDate = `${dateList[0]}/${formatedMonth}/${dateList[2]}`

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Você tem certeza que quer deletar?</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
        <h5>Informações:</h5>
          {data && <section>
            <p><strong>Paciente:</strong> {data.name}</p>
            <p><strong>Médico:</strong> {doctor.name}</p>
            <Row  className="mb-3">
              <Col><strong>Tipo:</strong> {doctor.field}</Col>
              <Col><strong>Data:</strong> {formatedDate}</Col>
              <Col><strong>Horário:</strong> {data.scheduleTime}</Col>
            </Row>
          </section>}
          <Modal.Footer className="pb-0">
            <Button sm="4"  onClick={handleClose} variant="secondary">Cancelar</Button>
            <Button variant="primary" onClick={submitHandler}>Deletar</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}