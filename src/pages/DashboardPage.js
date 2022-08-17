import { useState } from "react"

import SearchForm from "../components/SearchForm"
import Dashboard from "../components/Dashboard"
import Calendar from "react-calendar"

import 'react-calendar/dist/Calendar.css'
import styles from "./DashboardPage.module.css"
import { Col, Row, Container} from "react-bootstrap"
import DoctorsList from "../components/doctors/DoctorsList"
import SectionWrapper from "../layouts/SectionWrapper"

const DUMMY_LIST = [
  {
    id: 1,
    name: "João Carlos",
    field: "Ginecologista",
    schedules: []
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
    schedules: []
  },
  {
    id: 4,
    name: "Lucas Xavier",
    field: "Dermatologista",
    schedules: []
  }
]

export default function DashboardPage(){
  const [date,setDate] = useState(new Date())

  return (
    <div className={styles.wrapper}>
      <Container fluid>
        <Row>
          <Col sm={8}>
            <SearchForm/>
            <Dashboard/>
          </Col>
          <Col sm={4}>
            <SectionWrapper>
              <Calendar locale="pt-BR" onChange={setDate} value={date}/>
              <DoctorsList doctorsList={DUMMY_LIST} addClass="mt-5"/>  
            </SectionWrapper>
          </Col>
        </Row>
      </Container>
    </div>
  )
}