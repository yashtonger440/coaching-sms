import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error("Error fetching student", err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (!student) return <Layout>Loading...</Layout>;

  const paid = Number(student.paid || 0);
  const pending = Number(student.feesTotal || 0) - paid;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-4 md:p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <img
            src={
              student.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border mx-auto sm:mx-0"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold">
              {student.name}
            </h1>
            <p className="text-gray-600">{student.course}</p>
            <p className="text-sm text-gray-500 break-all">
              {student.email}
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Info label="Phone" value={student.phone} />
          <Info label="DOB" value={student.dob?.slice(0, 10)} />
          <Info label="Gender" value={student.gender} />
        </div>

        {/* Address */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Address</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            {student.address || "-"}, {student.city || "-"},{" "}
            {student.state || "-"} - {student.pincode || "-"}
          </p>
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <FeeCard
            title="Total Fees"
            value={`₹${student.feesTotal || 0}`}
          />
          <FeeCard title="Paid" value={`₹${paid}`} color="green" />
          <FeeCard title="Pending" value={`₹${pending}`} color="red" />
        </div>

        {/* Back */}
        <div className="mt-6 text-center sm:text-left">
          <Link
            to="/students"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
          >
            ← Back to Students
          </Link>
        </div>
      </div>
    </Layout>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

const FeeCard = ({ title, value, color = "gray" }) => (
  <div className="border rounded p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-xl font-bold text-${color}-600`}>
      {value}
    </p>
  </div>
);

export default StudentDetails;
