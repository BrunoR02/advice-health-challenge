import { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function PaymentForm({submitData,onBackStep}){
  const [validated, setValidated] = useState(false)
  const [submited,setSubmited] = useState(false)

  const cardNumberRef = useRef("")
  const expNumberRef = useRef("")
  const CVCRef = useRef("")
  const titularNameRef = useRef("")
  const installmentRef = useRef("") //Parcelas

  //Valor Teste de uma consulta
  let price = 205

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if(form.checkValidity() === true){
      setSubmited(true)
      const paymentInfo = {
        cardNumber: cardNumberRef.current.value,
        expirationDate: expNumberRef.current.value,
        CVC: CVCRef.current.value,
        titularName: titularNameRef.current.value,
        installment: installmentRef.current.value, 
      }

      submitData(paymentInfo)
    }
    setValidated(true)
  }

  return (
    <>
      <h5>Preço da Consulta: R${price.toFixed(2)}</h5>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="12" className="mb-3" controlId="PaymentForm.ControlInput2">
            <Form.Label>Número do Cartão</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="1234 1234 1234 1234"
              autoFocus
              ref={cardNumberRef}
              minLength="19"
              maxLength="19"
              pattern="(?:\d{4} ){3}\d{4}"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" className="mb-3" controlId="PaymentForm.ControlInput2">
            <Form.Label>Data de Expiração</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="MM/AA"
              autoFocus
              ref={expNumberRef}
              minLength="5"
              maxLength="7"
              pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"
            />
          </Form.Group>
          <Form.Group as={Col} md="3" className="mb-3" controlId="PaymentForm.ControlInput2">
            <Form.Label>CVC</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ex: 123"
              autoFocus
              ref={CVCRef}
              minLength="3"
              maxLength="3"
              pattern="[0-9]{1,3}"
            />
          </Form.Group>
          <Form.Group as={Col} md="8" className="mb-3" controlId="PaymentForm.ControlInput6">
            <Form.Label>Parcelas</Form.Label>
            <Form.Select required
              type="text"
              placeholder="Ex: 408"
              autoFocus
              ref={installmentRef}>
                <option>1x de R${price.toFixed(2)} sem juros</option>
                <option>2x de R${(price/2).toFixed(2)} sem juros</option>
                <option>3x de R${(price/3).toFixed(2)} sem juros</option>
                <option>4x de R${(price/4).toFixed(2)} sem juros</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="12" className="mb-3" controlId="PaymentForm.ControlInput4">
            <Form.Label>Nome do Titular do Cartão</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Insira o nome do titular"
              autoFocus
              ref={titularNameRef}
              pattern="^[a-zA-Z ]+$"
            />
          </Form.Group>
        </Row>
          
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onBackStep}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" disabled={submited}>
            Agendar
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}