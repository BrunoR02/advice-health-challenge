import { Form } from "react-bootstrap"

import styles from "./SearchForm.module.css"

import searchIcon from "../images/search.png"

export default function SearchForm(){

  function submitHandler(e){
    e.preventDefault()
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex mt-5">
      <input className={styles.searchInput} type="text" placeholder="BUSCA"/>
      <button className={styles.searchButton}><img src={searchIcon} alt="Search" width="25px"/></button>
    </Form>
  )
}