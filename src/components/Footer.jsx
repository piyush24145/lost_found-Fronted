import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide mb-3 text-white">
            Lost & Found
          </h1>
          <p className="text-sm leading-relaxed text-gray-400">
            Helping people reconnect with their belongings. Report lost and
            found items with ease and be part of a helpful community.
          </p>
        </div>

      
        <div>
          <h2 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block text-white">
            Contact Information
          </h2>
          <p className="mb-3">
            Email:{" "}
            <a
              href="mailto:piyushkumar04136@gmail.com"
              className="text-indigo-400 font-medium hover:text-indigo-300 transition"
            >
              piyushkumar04136@gmail.com
            </a>
          </p>
          <div className="flex space-x-5 text-2xl">
            <a
              href="https://www.linkedin.com/in/piyush-kumar-b071132a4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 text-indigo-400 hover:text-white shadow-md transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 text-indigo-400 hover:text-white shadow-md transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/piyush24145"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 text-indigo-400 hover:text-white shadow-md transition duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

       
        <div>
          <h2 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block text-white">
            Additional Links
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/terms-condition"
                className="hover:text-indigo-400 transition duration-200"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/Privacy-Policy"
                className="hover:text-indigo-400 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lost & Found. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
