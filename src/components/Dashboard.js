import { Card} from "react-bootstrap";

export default function Dashboard(){
  return (
    <div className="mt-5">
      <h4 className="mx-3 mb-3">DASHBOARD</h4>
      <section className="d-flex align-items-stretch">
        <Card border="success" style={{ width: '100%', borderLeftWidth: "20px"}} className="d-flex justify-content-center">
          <Card.Body>
            <Card.Title>Faturamento do dia:</Card.Title>
            <Card.Text className="align-self-center text-success" style={{fontSize: "2.5em"}}>R$ 3.065.23</Card.Text>
          </Card.Body>
        </Card>
        <Card border="warning" style={{ width: '100%', borderLeftWidth: "20px" }} className="d-flex justify-content-center mx-2">
          <Card.Body>
            <Card.Title>Agendamentos hoje: </Card.Title>
            <Card.Text className="align-self-center text-warning" style={{fontSize: "2em"}}>34</Card.Text>
          </Card.Body>
        </Card>
        <Card border="info" style={{ width: '100%', borderLeftWidth: "20px"}} className="d-flex justify-content-center">
          <Card.Body>
            <Card.Title>Pacientes atendidos hoje: </Card.Title>
            <Card.Text className="align-self-center text-info" style={{fontSize: "2em"}}>24</Card.Text>
          </Card.Body>
        </Card>
        
      </section>
    </div>
  )
}