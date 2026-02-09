import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
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
    paid: "",
    feesTotal: "",
  });

  // 🔄 Fetch
  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data || []);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔍 Search
  const filtered = students.filter((s) =>
    `${s.name} ${s.course}`.toLowerCase().includes(search.toLowerCase())
  );

  // ❌ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await api.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  // ✏️ Edit
  const handleEdit = (s) => {
    setForm({
      ...s,
      dob: s.dob ? s.dob.slice(0, 10) : "",
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

    editId
      ? await api.put(`/students/${editId}`, payload)
      : await api.post("/students", payload);

    setShowForm(false);
    setEditId(null);
    fetchStudents();
  };

  const openWhatsApp = (phone) => {
    if (!phone) return;
    window.open(`https://wa.me/91${phone}`, "_blank");
  };

  return (
    <Layout>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6 px-4">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex gap-3 flex-wrap">
          <input
            className="border p-2 rounded"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                paid: "",
                feesTotal: "",
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

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow rounded mx-4 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Paid</th>
              <th className="p-4 text-left">Pending</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => {
              const paid = s.paid || 0;
              const pending = (s.feesTotal || 0) - paid;

              return (
                <tr key={s._id} className="border-t">
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4">{s.course}</td>
                  <td className="p-4">₹{s.feesTotal}</td>
                  <td className="p-4 text-green-600">₹{paid}</td>
                  <td className="p-4 text-red-600">₹{pending}</td>

                  <td className="p-4 text-center space-x-2">
                    <Link
                      to={`/students/${s._id}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => openWhatsApp(s.phone)}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded"
                    >
                      WhatsApp
                    </button>

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

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden px-4 space-y-4">
        {filtered.map((s) => {
          const paid = s.paid || 0;
          const pending = (s.feesTotal || 0) - paid;

          return (
            <div key={s._id} className="bg-white shadow rounded p-4">
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="text-sm text-gray-500">{s.course}</p>
              <p className="text-sm">Gender: {s.gender || "-"}</p>
              <p className="text-sm">Address: {s.address || "-"}</p>

              <p>Total: ₹{s.feesTotal}</p>
              <p className="text-green-600">Paid: ₹{paid}</p>
              <p className="text-red-600">Pending: ₹{pending}</p>

              <div className="flex gap-2 flex-wrap mt-3">
                <Link
                  to={`/students/${s._id}`}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
                >
                  View
                </Link>

                <button
                  onClick={() => openWhatsApp(s.phone)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm"
                >
                  WhatsApp
                </button>

                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= POPUP FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Student" : "Add Student"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2" />
              <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2" />

              <select name="gender" value={form.gender} onChange={handleChange} className="border p-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 sm:col-span-2"
              />

              <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2" />
              <input name="feesTotal" type="number" value={form.feesTotal} onChange={handleChange} placeholder="Total Fees" className="border p-2" />
              <input name="paid" type="number" value={form.paid} onChange={handleChange} placeholder="Paid Fees" className="border p-2" />

              <div className="sm:col-span-2 flex gap-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border p-2">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 text-white p-2">
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

export default Students;
