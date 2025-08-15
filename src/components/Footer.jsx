
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-200 text-gray-900 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide mb-3">
            Lost & Found
          </h1>
          <p className="text-sm leading-relaxed">
            Helping people reconnect with their belongings. Report lost and found
            items with ease and be part of a helpful community.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 border-b-2 border-indigo-600 inline-block">
            Contact Information
          </h2>
          <p className="mb-3">
            Email:{" "}
            <a
              href="mailto:piyushkumar04136@gmail.com"
              className="text-indigo-700 font-medium hover:underline"
            >
              piyushkumar04136@gmail.com
            </a>
          </p>
          <div className="flex space-x-5 text-2xl">
            <a
              href="https://www.linkedin.com/in/piyush-kumar-b071132a4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BJb11lekjT8aFKyS7PPMGtw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-md hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-md hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/piyush24145"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-md hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 border-b-2 border-indigo-600 inline-block">
            Additional Links
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/terms-condition"
                className="hover:text-indigo-700 transition duration-200"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/Privacy-Policy"
                className="hover:text-indigo-700 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} Lost & Found. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
