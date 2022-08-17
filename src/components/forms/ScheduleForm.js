import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {useLocation } from "react-router-dom"
import ScheduleContext from "../../store/schedule-context";

export default function ScheduleForm({submitData, scheduleTime, isEditing}){
  const [validated, setValidated] = useState(false)
  const [submited,setSubmited] = useState(false)
  const [currentDate,setCurrentDate] = useState("")
  const [idRef, setIdRef] = useState("")

  const {doctors,activeDoctor} = useContext(ScheduleContext)

  const location = useLocation()

  //Atualizar valor dos Inputs com os Dados já inseridos usando Refs
  const updateRefs = useCallback((loadedData) =>{
    setIdRef(loadedData.id)
    nameRef.current.value = (loadedData.name)
    cpfRef.current.value = (loadedData.cpf)
    birthDateRef.current.value = (loadedData.birthDate)
    addressRef.current.value = (loadedData.address)
    addressNumRef.current.value = (loadedData.addressNum)
    addressBairroRef.current.value = (loadedData.addressBairro)
    addressCompRef.current.value = (loadedData.addressComp)
    obsRef.current.value = (loadedData.observation)
  },[])

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const date = params.get("date")
    setCurrentDate(date)
  },[location.search])

  useEffect(()=>{
    //Verificar se está editando apenas o agendamento.
    if(isEditing && currentDate !== ""){
      const {schedules} = doctors.find(item=>item.id===activeDoctor)
      updateRefs(schedules.find(item=>item.scheduleDate===currentDate && item.scheduleTime===scheduleTime))
    }
  },[isEditing,currentDate,scheduleTime,updateRefs,activeDoctor,doctors])

  const nameRef = useRef("")
  const cpfRef = useRef("")
  const birthDateRef = useRef("")
  const addressRef = useRef("")
  const addressNumRef = useRef("")
  const addressBairroRef = useRef("")
  const addressCompRef = useRef("")
  const obsRef = useRef("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if(form.checkValidity() === true){
      setSubmited(true)
      const scheduleData = {
        //Gera um ID Aleatório
        id: !isEditing ? Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase() : idRef,
        name: nameRef.current.value,
        ref: activeDoctor,
        cpf: cpfRef.current.value,
        birthDate: birthDateRef.current.value,
        address: addressRef.current.value,
        addressNum: parseInt(addressNumRef.current.value),
        addressBairro: addressBairroRef.current.value,
        addressComp: addressCompRef.current.value,
        observation: obsRef.current.value,
        status: "Pago",
        scheduleTime,
        scheduleDate: currentDate,
      }

      submitData(scheduleData)
    }
    setValidated(true)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Form.Group className="mb-3" controlId="scheduleForm.ControlInput1">
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o nome completo"
            autoFocus
            ref={nameRef}
            pattern="^[a-zA-Z ]+$"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3" controlId="scheduleForm.ControlInput2">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="123.456.789-12"
            autoFocus
            ref={cpfRef}
            minLength="11"
            maxLength="14"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            disabled={isEditing}
          />
        </Form.Group>
        <Form.Group as={Col} md="5" className="mb-3" controlId="scheduleForm.ControlInput3">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control
            required
            type="date"
            autoFocus
            ref={birthDateRef}
          />
        </Form.Group>
        <Form.Group as={Col} md="9" className="mb-3" controlId="scheduleForm.ControlInput4">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o endereço"
            autoFocus
            ref={addressRef}
            pattern="^[a-zA-Z ]+$"
          />
        </Form.Group>
        <Form.Group as={Col} md="3" className="mb-3" controlId="scheduleForm.ControlInput6">
          <Form.Label>Número</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ex: 408"
            autoFocus
            ref={addressNumRef}
            pattern="[0-9]{1,5}"
            maxLength="5"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3" controlId="scheduleForm.ControlInput5">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Digite o bairro"
            autoFocus
            ref={addressBairroRef}
            pattern="^[a-zA-Z ]+$"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3" controlId="scheduleForm.ControlInput7">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            type="text"
            autoFocus
            ref={addressCompRef}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Observações</Form.Label>
          <Form.Control as="textarea" rows={3} style={{resize: "none"}} ref={obsRef}/>
        </Form.Group>
      </Row>
      
      <Modal.Footer className="pb-0">
        <Button variant="primary" type="submit" disabled={submited}>
          {isEditing ? "Editar" : "Ir para o pagamento"}
        </Button>
      </Modal.Footer>
    </Form>
  )
}