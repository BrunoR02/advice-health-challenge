import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Calendar } from "react-calendar";
import DoctorsList from "../components/doctors/DoctorsList";
import ScheduleList from "../components/schedules/ScheduleList";
import SectionWrapper from "../layouts/SectionWrapper";

import { useNavigate } from "react-router-dom";

import styles from "./SchedulePage.module.css"
import Alert from "../components/helpers/Alert";
import { useSelector } from "react-redux";
import ScheduleContext from "../store/schedule-context";

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

export default function SchedulePage(){
  const [date,setDate] = useState(new Date())

  const navigate = useNavigate()

  const alertOn = useSelector(state=>state.alertOn)

  const {doctors,activeDoctor} = useContext(ScheduleContext)

  useEffect(()=>{
    navigate(`?date=${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`)
  },[date,navigate])

  return (
    <div className={styles.wrapper}>
      {alertOn && <Alert/>}
      <Container fluid>
        <Row>
          <Col sm={4}>
            <SectionWrapper>
              <DoctorsList addClass="mb-3" doctorsList={DUMMY_LIST}/>
              <Calendar locale="pt-BR" onChange={setDate} value={date}/>
            </SectionWrapper>
          </Col>
          <Col sm={8}>
            <ScheduleList currentDoctor={doctors.find(item=>item.id===activeDoctor) || null} currentDate={{
              day: date.getDate(),
              month: date.getMonth(),
              year: date.getFullYear()
            }}/>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}