import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import axios from "axios";



const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    course: "",
    qualification:"",
    experience:""
  });

  // 🔄 Fetch students
  const fetchStudents = async () => {
    const res = await api.get("/teachers");
    if (Array.isArray(res.data)) setTeachers(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔍 Search
  const filteredStudents = teachers.filter((s) => {
    const name = s.name || "";
    const course = s.course || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // ❌ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Confirm delete?")) {
      await api.delete(`/teachers/${id}`);
      fetchStudents();
    }
  };

  // ✏️ Edit
  const handleEdit = (s) => {
    setForm({
      name: s.name || "",
      email: s.email || "",
      phone: s.phone || "",
      dob: s.dob ? s.dob.slice(0, 10) : "",
      gender: s.gender || "",
      address: s.address || "",
      city: s.city || "",
      state: s.state || "",
      pincode: s.pincode || "",
      course: s.course || "",
      qualification: s.qualification || "",
      experience: s.experience || "",
     
    });
    setEditId(s._id);
    setShowForm(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ➕ Add / ✏️ Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      feesTotal: Number(form.feesTotal),
      paid: Number(form.paid),
    };

    if (editId) {
      await api.put(`/teachers/${editId}`, payload);
    } else {
      await api.post("/teachers", payload);
    }

    setShowForm(false);
    setEditId(null);
    fetchStudents();
  };

  // 📲 WhatsApp
  const getWhatsappLink = (s) => {
    if (!s.phone) return "#";

    const paid = s.paid || 0;
    const pending = (s.feesTotal || 0) - paid;

    const msg = `Hello ${s.name},
    Course: ${s.course}
    Total Fees: ₹${s.feesTotal}
    Paid: ₹${paid}
    Pending: ₹${pending}`;

    return `https://wa.me/91${s.phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6 px-4">
        <h1 className="text-2xl font-bold">All Teachers</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => {
              setForm({
                name: "",
                email: "",
                phone: "",
                dob: "",
                gender: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                course: "",
                experience:"",
                qualification:""
              });
              setEditId(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded mx-4 overflow-x-auto">
        <table className="min-w-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Subject</th>
               <th className="p-4">Qualfication</th>
              <th className="p-4">Experience</th>
             
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => {
              const paid = s.paid || 0;
              const pending = (s.feesTotal || 0) - paid;

              return (
                <tr key={s._id} className="border-t text-center">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">{s.course}</td>
                   <td className="p-4">{s.qualification}</td>
                  <td className="p-4">{s.experience}</td>
                 

                  <td className="p-4 space-x-2 text-center whitespace-nowrap">
                    <Link
                      to={`/teachers/${s._id}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                    >
                      View
                    </Link>

                    {s.phone && (
                      <a
                        href={getWhatsappLink(s)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-100 text-green-700 px-3 py-1 rounded"
                      >
                        WhatsApp
                      </a>
                    )}

                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Student" : "Add Teachers"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2"
              />
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="border p-2"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border p-2"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input
                name="Subject"
                value={form.course}
                onChange={handleChange}
                placeholder="subject"
                className="border p-2"
              />

                 <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="border p-2"
              />

                 <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="border p-2"
              />


              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 sm:col-span-2"
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border p-2"
              />
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="border p-2"
              />
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border p-2"
              />

            
            

              <div className="sm:col-span-2 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border p-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2"
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Teachers;
