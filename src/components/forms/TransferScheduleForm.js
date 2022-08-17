import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {useLocation } from "react-router-dom"
import ScheduleContext from "../../store/schedule-context";

import { monthsList, workingTime } from "../../helpers/variables";

export default function ScheduleForm({submitData, scheduleTime}){
  const [validated, setValidated] = useState(false)
  const [currentDate,setCurrentDate] = useState("")
  const [loadedData,setLoadedData] = useState(null)

  const {doctors, activeDoctor} = useContext(ScheduleContext)
  const doctor = doctors.find(item=>item.id===activeDoctor)

  const location = useLocation()

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const date = params.get("date")
    setCurrentDate(date)
  },[location.search])

  useEffect(()=>{
    setLoadedData(doctor.schedules.find(item=>item.scheduleTime===scheduleTime && item.scheduleDate===currentDate))
  },[currentDate,scheduleTime, doctor.schedules])

  
  const timeRef = useRef("")
  const dateRef = useRef("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if(form.checkValidity() === true){
      let formatedDate = dateRef.current.value.split("-")
      let formatMonth = formatedDate[1].indexOf("0") === 0 ? formatedDate[1].replace("0","") : formatedDate[1]

      const data = {
        id: loadedData.id,
        scheduleTime: timeRef.current.value,
        scheduleDate: `${formatedDate[2]}-${formatMonth}-${formatedDate[0]}`
      }

      submitData(data)
    }
    setValidated(true)
  }

  let dateList = loadedData ? loadedData.scheduleDate.split("-") : ""
  let formatedMonth = monthsList[+dateList[1]-1]
  let formatedDate = `${dateList[0]}/${formatedMonth}/${dateList[2]}`

  return (
    <>
      <h5>Informações:</h5>
      {loadedData && <section>
        <p><strong>Paciente:</strong> {loadedData.name}</p>
        <p><strong>Médico:</strong> {doctor.name}</p>
        <Row  className="mb-3">
          <Col><strong>Tipo:</strong> {doctor.field}</Col>
          <Col><strong>Data:</strong> {formatedDate}</Col>
          <Col><strong>Horário:</strong> {loadedData.scheduleTime}</Col>
        </Row>
      </section>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="8" className="mb-3" controlId="PaymentForm.ControlInput6">
            <Form.Label>Novo Horário</Form.Label>
            <Form.Select required
              type="text"
              placeholder="Ex: 408"
              autoFocus
              ref={timeRef}>
                {workingTime.map((time)=>{
                  return <option key={time}>{time}</option>
                })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="5" className="mb-3" controlId="scheduleForm.ControlInput3">
            <Form.Label>Nova Data</Form.Label>
            <Form.Control
              required
              type="date"
              autoFocus
              ref={dateRef}
              min="2022-08-17"
            />
          </Form.Group>
        </Row>
        
        <Modal.Footer className="pb-0">
          <Button variant="primary" type="submit">
            Transferir
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}