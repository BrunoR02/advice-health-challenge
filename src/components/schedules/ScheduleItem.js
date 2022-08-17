import { Card, Image } from "react-bootstrap";

import userIcon from "../../images/user-icon.png"
import editIcon from "../../images/edit.png"
import editScheduleIcon from "../../images/edit-schedule.png"
import deleteIcon from "../../images/delete.png"
import addIcon from "../../images/add.png"

import styles from "./ScheduleItem.module.css"
import {useState } from "react"
import AddScheduleModal from "../modals/AddScheduleModal"
import EditScheduleModal from "../modals/EditScheduleModal"
import TransferScheduleModal from "../modals/TransferScheduleModal"
import DeleteScheduleModal from "../modals/DeleteScheduleModal"

export default function ScheduleItem({data,time}){
  const [showAdd,setShowAdd] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <>
      {showAdd && <AddScheduleModal show={showAdd} scheduleTime={time} handleClose={() => setShowAdd(false)}/>}
      {showEdit && <EditScheduleModal show={showEdit} scheduleTime={time} handleClose={() => setShowEdit(false)}/>}
      {showTransfer && <TransferScheduleModal show={showTransfer} scheduleTime={time} handleClose={() => setShowTransfer(false)}/>}
      {showDelete && <DeleteScheduleModal show={showDelete} data={data} handleClose={()=> setShowDelete(false)}/>}
      <li className={styles.item}>
        <Card body className={styles.card}>
          <section className="d-flex align-items-center">
            <span className={styles.time}>{time}</span>
            {data ? <Image src={userIcon} style={{width: "50px"}} className="mx-4" /> : ""}
            <div className={styles.info}>
              <h4 className={styles.name}>{data ? data.name : ""}</h4>
              {data ? <span className="text-warning">Status: {data.status}</span> : ""}
            </div>
          </section>
          <section className={styles.action}>
            {data && <button className={styles.actionButton} onClick={() => setShowTransfer(true)}><img src={editScheduleIcon} alt="edit" width="25px"/></button> }
            {data && <button className={styles.actionButton} onClick={() => setShowDelete(true)}><img src={deleteIcon} alt="delete" width="25px"/></button>}
            {data && <button className={styles.actionButton} onClick={() => setShowEdit(true)}><img src={editIcon} alt="edit" width="25px"/></button>}

            {!data && <button className={styles.actionButton} onClick={() => setShowAdd(true)}><img src={addIcon} alt="edit" width="25px"/></button>}
          </section>
        </Card>
      </li>
    </>
    
  )
}