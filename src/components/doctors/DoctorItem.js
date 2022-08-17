import { Card, Image } from "react-bootstrap";

import styles from "./DoctorItem.module.css"

export default function DoctorItem({name,field,imageSrc,addClass, onClickHandler}){

  return (
    <Card body className={`mb-3 ${styles.item} ${addClass}`} onClick={onClickHandler}>
      <section className="d-flex align-items-center">
        <Image src={imageSrc} style={{width: "50px"}} />
        <div className={styles.info}>
          <h4 className={styles.name}>{name}</h4>
          <span className={styles.field}>{field}</span>
        </div>
      </section>
    </Card>
  )
}