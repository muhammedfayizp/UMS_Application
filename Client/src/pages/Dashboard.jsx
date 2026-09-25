import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's what's happening with your account.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">
              1,250
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Projects</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">
              24
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">Messages</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">
              18
            </h3>
          </div>
        </div>

        {/* Welcome section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Welcome to your dashboard
          </h3>

          <p className="text-gray-500 mt-2">
            You can manage your account, view your profile, and
            access your application from here.
          </p>

          <Link
            to="/profile"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            View Profile
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
