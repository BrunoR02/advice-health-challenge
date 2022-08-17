import styles from "./SectionWrapper.module.css"

export default function SectionWrapper({children}){
  return (
    <section className={`px-4 py-4 ${styles.sectionWrapper}`}>
      {children}
    </section>
  )
}