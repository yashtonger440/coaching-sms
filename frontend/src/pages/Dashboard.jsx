// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import api from "../api/axios";

// function Dashboard() {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   // 🔄 Fetch students
//   const fetchStudents = async () => {
//     const res = await api.get("/students");
//     if (Array.isArray(res.data)) setStudents(res.data);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);


//    const fetchTeachers = async () => {
//     const res = await api.get("/teachers");
//     if (Array.isArray(res.data)) setTeachers(res.data);

    
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);
//   return (
//     <div>
//       <Layout>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-green-300 p-4 rounded shadow">
//             <h2 className="font-semibold text-lg">Total Students</h2>
//             <p className="text-2xl mt-2">{students.length}</p>
//           </div>
//           <div className="bg-blue-300 p-4 rounded shadow">
//             <h2 className="font-semibold text-lg">Total Faculties</h2>
//             <p className="text-2xl mt-2">{teachers.length}</p>
//           </div>
//           <div className="bg-gray-300 p-4 rounded shadow">
//             <h2 className="font-semibold text-lg">Total Classes</h2>
//             <p className="text-2xl mt-2">0</p>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  /* ───── Fetch Students ───── */
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      if (Array.isArray(res.data)) setStudents(res.data);
    } catch (err) {
      console.error("Students fetch error", err);
    }
  };

  /* ───── Fetch Teachers ───── */
  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      if (Array.isArray(res.data)) setTeachers(res.data);
    } catch (err) {
      console.error("Teachers fetch error", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  /* ───── Chart Data ───── */
  const overviewData = [
    { name: "Students", count: students.length },
    { name: "Faculties", count: teachers.length },
  ];

  const growthData = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 180 },
    { month: "Mar", students: 240 },
    { month: "Apr", students: students.length },
  ];

  return (
    <Layout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of students and faculties
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow border">
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {students.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow border">
          <h2 className="text-sm text-gray-500">Total Faculties</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {teachers.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow border">
          <h2 className="text-sm text-gray-500">Total Classes</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="font-semibold text-gray-800 mb-4">
            Student Growth
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="studentColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#6366f1"
                fill="url(#studentColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow border">
          <h2 className="font-semibold text-gray-800 mb-4">
            Students vs Faculties
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

