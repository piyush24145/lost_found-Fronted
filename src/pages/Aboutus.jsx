import React from "react";
import { FaBullseye, FaEye, FaUsers } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 py-16 px-6 lg:px-32">
      <section className="mb-12 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
  About Khoja Kya
</h1>
<p className="text-lg text-center italic text-yellow-800 mb-6">
  "Because Every Lost Item Deserves to Be Found."
</p>
        <p className="text-gray-700 text-lg  mx-auto mb-6 leading-relaxed">
          Khoja Kya is a community-driven platform designed to help individuals
          report and reclaim lost items. Our mission is to create a seamless process
          for reuniting people with their belongings by facilitating the reporting
          of both lost and found items.
        </p>
        <p className="text-gray-700 text-lg  mx-auto leading-relaxed">
          Our platform includes user-friendly features for reporting items, verifying
          ownership, and managing user profiles. Additionally, we offer administrative
          tools for overseeing site activity and user management to ensure a smooth and
          efficient experience for all users.
        </p>
      </section>
      <section className="mb-12 animate-fadeIn delay-200">
        <div className="flex items-center gap-3 mb-3">
          <FaBullseye className="text-blue-600 text-2xl" />
          <h2 className="text-2xl font-semibold">Our Mission</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          At Khoja Kya, our mission is to reduce the stress and inconvenience of
          losing personal belongings. By leveraging the power of community and
          technology, we aim to increase the chances of lost items being returned to
          their rightful owners.
        </p>
      </section>
      <section className="mb-12 animate-fadeIn delay-400">
        <div className="flex items-center gap-3 mb-3">
          <FaEye className="text-green-600 text-2xl" />
          <h2 className="text-2xl font-semibold">Our Vision</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
         We aim to create a safer and more connected campus environment where any lost item — whether a student ID card, books, or personal belongings — can be quickly located and returned to its rightful owner. By using a simple and accessible platform, we hope to reduce the stress and disruption caused by losing important items, while fostering a spirit of trust and cooperation among students, faculty, and staff. Our vision is to make the college a place where no lost item remains lost for long.
        </p>
      </section>
      <section className="animate-fadeIn delay-600">
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-purple-600 text-2xl" />
          <h2 className="text-2xl font-semibold">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
<div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
  <img
    className="w-full h-80 object-cover object-top"
    src="/piyushkumar.jpeg"
    alt="Team member"
  />
  <div className="p-5 text-center">
    <h3 className="text-lg font-bold">Piyush Kumar</h3>
    <p className="text-sm text-gray-600">Founder & CEO</p>
    student at iiit una
  </div>
</div>
<div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
  <img
    className="w-full h-120 object-cover object-top "
    src="/piyushkumar1.jpeg"
    alt="Team member"
  />
  <div className="p-5 text-center">
    <h3 className="text-lg font-bold"></h3>
    <p className="text-sm text-gray-600"></p>
  </div>
</div>

        </div>
      </section>

    
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
}

export default AboutUs;
