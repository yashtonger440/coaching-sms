import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
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
  const filteredResults = results.filter((r) =>
    `${r.studentName} ${r.course}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ❌ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this result?")) {
      await api.delete(`/results/${id}`);
      fetchResults();
    }
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

    editId
      ? await api.put(`/results/${editId}`, payload)
      : await api.post("/results", payload);

    setShowForm(false);
    setEditId(null);
    fetchResults();
  };

  return (
    <Layout>
      {/* ================= HEADER ================= */}
      <div className="px-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Results</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="border rounded px-3 py-2"
              placeholder="Search result..."
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
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="md:hidden space-y-4 px-4">
        {filteredResults.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div>
              <h2 className="font-bold text-lg">{r.studentName}</h2>
              <p className="text-sm text-gray-500">
                {r.course} • {r.testName}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <span>Total Marks</span>
              <span>{r.totalMarks}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Obtained</span>
              <span>{r.obtainedMarks}</span>
            </div>

            <div className="flex justify-between text-sm font-semibold">
              <span>Percentage</span>
              <span>{r.percentage?.toFixed(2)}%</span>
            </div>

            <div
              className={`text-sm font-semibold ${
                r.status === "Pass" ? "text-green-600" : "text-red-600"
              }`}
            >
              {r.status}
            </div>

            <div className="flex flex-wrap gap-2 pt-3">
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
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (TABLE) ================= */}
      <div className="hidden md:block bg-white shadow rounded mx-4 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Student</th>
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
                <td className="p-4 text-center space-x-2">
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

      {/* ================= POPUP FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Result" : "Add Result"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                ["studentName", "Student Name"],
                ["course", "Course"],
                ["batch", "Batch"],
                ["testName", "Test Name"],
                ["totalMarks", "Total Marks", "number"],
                ["obtainedMarks", "Obtained Marks", "number"],
              ].map(([name, label, type = "text"]) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="border p-2 rounded"
                  required
                />
              ))}

              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border rounded py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded py-2"
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

export default Results;
