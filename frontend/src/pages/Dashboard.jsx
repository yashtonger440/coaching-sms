import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // 🔄 Fetch students
  const fetchStudents = async () => {
    const res = await api.get("/students");
    if (Array.isArray(res.data)) setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);


   const fetchTeachers = async () => {
    const res = await api.get("/teachers");
    if (Array.isArray(res.data)) setTeachers(res.data);

    
  };

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-300 p-4 rounded shadow">
            <h2 className="font-semibold text-lg">Total Students</h2>
            <p className="text-2xl mt-2">{students.length}</p>
          </div>
          <div className="bg-blue-300 p-4 rounded shadow">
            <h2 className="font-semibold text-lg">Total Faculties</h2>
            <p className="text-2xl mt-2">{teachers.length}</p>
          </div>
          <div className="bg-gray-300 p-4 rounded shadow">
            <h2 className="font-semibold text-lg">Total Classes</h2>
            <p className="text-2xl mt-2">0</p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Dashboard;
