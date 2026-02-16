import React from "react";

const courses = [
  {
    title: "Class 9th Foundation Batch",
    subjects: ["Maths", "Science", "English"],
    desc: "Strong concept building with weekly tests and doubt sessions.",
  },
  {
    title: "Class 10th Board Preparation",
    subjects: ["Maths", "Science", "English", "SST"],
    desc: "Focused board exam preparation with sample papers and revisions.",
  },
  {
    title: "Class 11th Science Stream",
    subjects: ["Physics", "Chemistry", "Maths / Biology"],
    desc: "Concept-based teaching for school exams and competitive base.",
  },
  {
    title: "Class 12th Board + Competitive",
    subjects: ["Physics", "Chemistry", "Maths / Biology"],
    desc: "Board-focused preparation with extra practice & exam strategy.",
  },
];

const Courses = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Courses
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          We offer structured coaching programs for Class 9th to 12th students
          with focus on concept clarity, board preparation, and personal guidance.
        </p>
      </section>

      {/* COURSES GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 gap-10">

        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition flex flex-col"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-4">{course.desc}</p>

            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-800">
                Subjects Covered:
              </h4>
              <ul className="text-gray-600 text-sm space-y-1">
                {course.subjects.map((sub, i) => (
                  <li key={i}>✔ {sub}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex gap-4">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
                Enroll Now
              </button>

              <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition">
                View Details
              </button>
            </div>
          </div>
        ))}

      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            What Students Get
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">

            {[
              "Regular Tests & Performance Tracking",
              "Doubt Sessions Every Week",
              "Board Exam Practice Papers",
              "Small Batch Size for Attention",
              "Experienced Teachers",
              "Concept-Based Teaching",
              "Study Material Included",
              "Friendly Learning Environment",
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl shadow">
                <p className="font-semibold text-gray-700">✔ {item}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Want to Enroll Your Child?
        </h2>
        <p className="opacity-90 mb-6">
          Contact us today to get batch details, timings, and admission info.
        </p>
        <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition shadow">
          Contact for Admission
        </button>
      </section>

    </div>
  );
};

export default Courses;
