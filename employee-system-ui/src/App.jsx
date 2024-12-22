import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AddEmployee from "./Components/AddEmployee";
import Header from "./Components/Header";
import EmployeeList from "./Components/EmployeeList";
import UpdateEmployee from "./Components/UpdateEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/updateEmployee/:id" element={<UpdateEmployee />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
