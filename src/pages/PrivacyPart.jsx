import React from "react";

const PrivacyPart = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how <strong>Lost & Found</strong> collects, uses, and protects your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside">
        <li>Name and contact details (email, phone)</li>
        <li>Details of lost or found items you report</li>
        <li>Technical data like IP address and browser type</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p>
        We use your data to process lost & found reports, communicate with you, and improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p>
        We do not sell or share your personal information with third parties, except when required by law or to assist in resolving a lost & found case.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p>
        We take reasonable steps to protect your information from unauthorized access or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p>
        You can request to update or delete your personal information at any time by contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Privacy Policy</h2>
      <p>
        We may update this Privacy Policy occasionally. Any changes will be posted on this page.
      </p>
    </div>
  );
};

export default PrivacyPart;
