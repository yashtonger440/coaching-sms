import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Results = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    studentName: "",
    course: "",
    batch: "",
    testName: "",
    totalMarks: "",
    obtainedMarks: "",
  });

  // 🔄 Fetch results
  const fetchResults = async () => {
    const res = await api.get("/results");
    if (Array.isArray(res.data)) setResults(res.data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // 🔍 Search
  const filteredResults = results.filter((r) => {
    const name = r.studentName || "";
    const course = r.course || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // ❌ Delete
const handleDelete = async (id) => {
  await api.delete(`/results/${id}`);
  setResults(prev => prev.filter(r => r._id !== id));
};


  // ✏️ Edit
  const handleEdit = (r) => {
    setForm({
      studentName: r.studentName || "",
      course: r.course || "",
      batch: r.batch || "",
      testName: r.testName || "",
      totalMarks: r.totalMarks || "",
      obtainedMarks: r.obtainedMarks || "",
    });
    setEditId(r._id);
    setShowForm(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ➕ Add / ✏️ Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const percentage =
      (Number(form.obtainedMarks) / Number(form.totalMarks)) * 100;

    const payload = {
      ...form,
      totalMarks: Number(form.totalMarks),
      obtainedMarks: Number(form.obtainedMarks),
      percentage,
      status: percentage >= 40 ? "Pass" : "Fail",
    };

    if (editId) {
      await api.put(`/results/${editId}`, payload);
    } else {
      await api.post("/results", payload);
    }

    setShowForm(false);
    setEditId(null);
    fetchResults();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6 px-4">
        <h1 className="text-2xl font-bold">Results</h1>

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
                studentName: "",
                course: "",
                batch: "",
                testName: "",
                totalMarks: "",
                obtainedMarks: "",
              });
              setEditId(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Result
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded mx-4 overflow-x-auto">
        <table className="min-w-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Test</th>
              <th className="p-4">%</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-4">{r.studentName}</td>
                <td className="p-4">{r.course}</td>
                <td className="p-4">{r.testName}</td>
                <td className="p-4 font-semibold">
                  {r.percentage?.toFixed(2)}%
                </td>
                <td
                  className={`p-4 font-semibold ${
                    r.status === "Pass"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {r.status}
                </td>

                <td className="p-4 space-x-2 text-center whitespace-nowrap">
                  <Link
                    to={`/results/${r._id}`}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEdit(r)}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r._id)}
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

      {/* Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Result" : "Add Result"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" className="border p-2" required />
              <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2" />
              <input name="batch" value={form.batch} onChange={handleChange} placeholder="Batch" className="border p-2" />
              <input name="testName" value={form.testName} onChange={handleChange} placeholder="Test Name" className="border p-2" />

              <input name="totalMarks" type="number" value={form.totalMarks} onChange={handleChange} placeholder="Total Marks" className="border p-2" required />
              <input name="obtainedMarks" type="number" value={form.obtainedMarks} onChange={handleChange} placeholder="Obtained Marks" className="border p-2" required />

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

export default Results;
