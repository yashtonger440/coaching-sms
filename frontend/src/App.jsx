import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";
import Results from "./pages/Results";
import Teachers from "./pages/Teachers";
import TeacherDetails from "./pages/TeacherDetails";
import ResultDetails from "./pages/ResultDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/results" element={<Results />}/>
        <Route path="/teachers/:id" element={<TeacherDetails />} />
        <Route path="/results/:id" element={<ResultDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
