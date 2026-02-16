import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Student";
import StudentDetails from "./pages/admin/StudentDetails";
import Results from "./pages/admin/Results";
import Teachers from "./pages/admin/Teachers";
import TeacherDetails from "./pages/admin/TeacherDetails";
import ResultDetails from "./pages/admin/ResultDetails";
import Home from "./pages/website/Home";
import About from "./pages/website/About";
import Courses from "./pages/website/Courses";
import Contact from "./pages/website/Contact";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
// import Footer from "./pages/website/Footer"


const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/results" element={<Results />}/>
        <Route path="/teachers/:id" element={<TeacherDetails />} />
        <Route path="/results/:id" element={<ResultDetails />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
