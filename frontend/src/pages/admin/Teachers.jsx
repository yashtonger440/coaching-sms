import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
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
    qualification: "",
    experience: "",
  });

  // 📲 WhatsApp with Auto Message
  const openWhatsApp = (t) => {
    if (!t.phone) return;

    const message = `
Hello ${t.name},

Subject: ${t.course || "-"}
Qualification: ${t.qualification || "-"}
Experience: ${t.experience || "-"}

Thank you.
    `;

    const url = `https://wa.me/91${t.phone}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  // 🔄 Fetch
  const fetchTeachers = async () => {
    const res = await api.get("/teachers");
    setTeachers(res.data || []);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 🔍 Search
  const filtered = teachers.filter((t) =>
    `${t.name} ${t.course}`.toLowerCase().includes(search.toLowerCase()),
  );

  // ❌ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this teacher?")) {
      await api.delete(`/teachers/${id}`);
      fetchTeachers();
    }
  };

  // ✏️ Edit
  const handleEdit = (t) => {
    setForm({
      name: t.name || "",
      email: t.email || "",
      phone: t.phone || "",
      dob: t.dob ? t.dob.slice(0, 10) : "",
      gender: t.gender || "",
      address: t.address || "",
      city: t.city || "",
      state: t.state || "",
      pincode: t.pincode || "",
      course: t.course || "",
      qualification: t.qualification || "",
      experience: t.experience || "",
    });
    setEditId(t._id);
    setShowForm(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ➕ Add / ✏️ Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/teachers/${editId}`, form);
    } else {
      await api.post("/teachers", form);
    }

    setShowForm(false);
    setEditId(null);
    fetchTeachers();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6 px-4">
        <h1 className="text-2xl font-bold">Teachers</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Search teacher..."
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
                qualification: "",
                experience: "",
              });
              setEditId(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Teacher
          </button>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow rounded mx-4 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Qualification</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="p-4 font-medium">{t.name}</td>
                <td className="p-4">{t.course}</td>
                <td className="p-4">{t.qualification}</td>
                <td className="p-4">{t.experience}</td>

                <td className="p-4 text-center space-x-2">
                  <Link
                    to={`/teachers/${t._id}`}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openWhatsApp(t)}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded"
                  >
                    WhatsApp
                  </button>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden px-4 space-y-4">
        {filtered.map((t) => (
          <div key={t._id} className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.course}</span>
            </div>

            <p className="text-sm">
              <b>Qualification:</b> {t.qualification}
            </p>
            <p className="text-sm">
              <b>Experience:</b> {t.experience}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              <Link
                to={`/teachers/${t._id}`}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
              >
                View
              </Link>

              <button
                onClick={() => handleEdit(t)}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => openWhatsApp(t)}
                className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm"
              >
                WhatsApp
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= POPUP FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Teacher" : "Add Teacher"}
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
              </select>

              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Subject"
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
