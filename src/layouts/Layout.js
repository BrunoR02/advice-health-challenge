import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";

export default function Layout({children}){
  return (
    <>
      <Header/>
      <div className="d-flex">
        <Sidebar/>
        {children}
      </div>
    </>
  )
}