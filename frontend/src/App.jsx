import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";
import Results from "./pages/Results";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />}/>
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/results" element={<Results />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
