import React from "react";

const Term = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">
        Welcome to <strong>Lost & Found</strong>. By using our platform, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Platform</h2>
      <p>
        Our platform is intended to help individuals report and reclaim lost items. You agree to use it only for lawful purposes and provide accurate information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Prohibited Actions</h2>
      <ul className="list-disc list-inside">
        <li>Posting false or misleading reports</li>
        <li>Sharing inappropriate or harmful content</li>
        <li>Engaging in spam or fraudulent activities</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
      <p>
        Lost & Found is not responsible for any inaccurate reports or disputes between users. Users are responsible for verifying the ownership of any items.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of our platform means you accept any changes.
      </p>
    </div>
  );
};

export default Term;
