import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Have questions about admission, batches or courses?  
          Get in touch with us and we’ll help you quickly.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* LEFT - FORM */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Send us a Message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* RIGHT - INFO */}
        <div className="space-y-8">

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Coaching Address
            </h3>
            <p className="text-gray-600">
              ABC Coaching Institute  
              <br />
              Main Road, Your City  
              <br />
              Near School Area
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Contact Details
            </h3>
            <p className="text-gray-600">📞 Phone: +91 9876543210</p>
            <p className="text-gray-600">📧 Email: coaching@email.com</p>
            <p className="text-gray-600">🕒 Timings: 8 AM – 8 PM</p>
          </div>

          {/* MAP */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-62.5 border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join Our Coaching?
        </h2>
        <p className="opacity-90 mb-6">
          Call us today or visit our institute for admission guidance.
        </p>
        <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition shadow">
          Call Now
        </button>
      </section>

    </div>
  );
};

export default Contact;
