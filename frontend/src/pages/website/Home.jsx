import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* HERO */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Best Coaching for  
              <span className="block text-yellow-300">Class 9th to 12th Students</span>
            </h1>

            <p className="text-lg opacity-90 mb-6">
              Strong concepts, board exam preparation, regular tests and
              personal guidance to help students score better.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/courses"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                View Courses
              </Link>

              <Link
                to="/contact"
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                Admission Inquiry
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              alt="classroom"
              className="rounded-2xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Why Choose Our Coaching
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Board Exam Focus</h3>
              <p className="text-gray-600 text-sm">
                Complete syllabus coverage with exam-oriented preparation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Regular Tests</h3>
              <p className="text-gray-600 text-sm">
                Weekly tests to improve performance and confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Personal Attention</h3>
              <p className="text-gray-600 text-sm">
                Small batches for better learning and guidance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Classes We Offer
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            {["Class 9th", "Class 10th", "Class 11th", "Class 12th"].map((cls) => (
              <div key={cls} className="border p-6 rounded-xl hover:shadow-lg transition">
                <h3 className="font-semibold text-lg mb-2">{cls}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Full syllabus + concept clarity + test series.
                </p>
                <Link to="/courses" className="text-blue-700 font-semibold">
                  Learn More →
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Give Your Child The Right Guidance 📚
          </h2>
          <p className="mb-6 opacity-90">
            Limited seats available. Contact now for admission details.
          </p>

          <Link
            to="/contact"
            className="bg-white text-indigo-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
