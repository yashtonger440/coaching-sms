import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our Coaching Institute
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          We provide quality education for students from Class 9th to 12th with
          a focus on strong concepts, board exam preparation, and personal guidance.
        </p>
      </section>

      {/* ABOUT INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="classroom"
          className="rounded-2xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Building Strong Academic Foundations
          </h2>

          <p className="text-gray-600 mb-4">
            Our coaching institute is dedicated to helping students achieve
            excellent academic performance and build confidence in their studies.
            We believe that every student has potential, and with the right
            guidance, they can achieve great success.
          </p>

          <p className="text-gray-600">
            With experienced teachers, regular tests, doubt sessions, and
            structured study plans, we ensure students stay on track and
            perform well in their school exams and board examinations.
          </p>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-blue-50 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide quality education with strong conceptual clarity,
              discipline, and personal attention so that students can excel
              in academics and develop confidence for future challenges.
            </p>
          </div>

          <div className="bg-indigo-50 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become a trusted coaching institute known for academic
              excellence, student success, and result-oriented teaching methods.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Our Coaching?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {[
            "Experienced Teachers",
            "Regular Tests & Performance Tracking",
            "Personal Doubt Sessions",
            "Board Exam Preparation",
            "Small Batch Size",
            "Friendly Learning Environment",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg text-blue-700 mb-2">
                ✔ {item}
              </h4>
              <p className="text-gray-600 text-sm">
                We focus on providing individual attention to every student so
                that no one is left behind.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* STATS */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="opacity-90">Students Taught</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="opacity-90">Years Experience</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">95%</h3>
            <p className="opacity-90">Board Result Success</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">20+</h3>
            <p className="opacity-90">Expert Teachers</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
