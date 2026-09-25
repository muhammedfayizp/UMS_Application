import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            MyApp
          </h1>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>

            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Profile */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">
                JD
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              John Doe
            </h2>

            <p className="text-gray-500">
              john@example.com
            </p>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 space-y-5">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900 mt-1">
                John Doe
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900 mt-1">
                john@example.com
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium text-gray-900 mt-1">
                User
              </p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="block text-center mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Profile;
