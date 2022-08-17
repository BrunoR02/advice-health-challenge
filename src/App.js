import Layout from "./layouts/Layout";
import DashboardPage from "./pages/DashboardPage";
import {Route,Routes} from "react-router-dom"
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/agendamento" element={<SchedulePage/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
