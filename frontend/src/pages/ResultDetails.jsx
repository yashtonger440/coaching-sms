import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

const ResultDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/results/${id}`);
        setResult(res.data);
      } catch (err) {
        alert("Result not found");
        navigate("/results");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10 text-lg">Loading result...</div>
      </Layout>
    );
  }

  if (!result) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border">

        {/* Header */}
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Result Sheet
          </h1>
          <p className="text-sm text-gray-500">
            Academic Performance Report
          </p>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          <Info label="Student Name" value={result.studentName} />
          <Info label="Course" value={result.course} />
          <Info label="Batch" value={result.batch} />
          <Info label="Test Name" value={result.testName} />
        </div>

        {/* Marks Section */}
        <div className="border rounded-lg p-5 bg-gray-50">
          <div className="flex justify-between mb-3">
            <span>Total Marks</span>
            <span className="font-semibold">{result.totalMarks}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Obtained Marks</span>
            <span className="font-semibold">{result.obtainedMarks}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Percentage</span>
            <span className="font-semibold">
              {result.percentage.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>
            <span
              className={`font-bold ${
                result.status === "Pass"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/results")}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            ⬅ Back
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            🖨 Print Result
          </button>
        </div>
      </div>
    </Layout>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default ResultDetails;
