import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });

        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Updated data:", formData);

        // Later:
        // call backend API here
        // update Redux user here

        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-10">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8 relative">

                    {/* Edit Button */}
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
                        title="Edit Profile"
                    >
                        ✏️
                    </button>

                    {/* Profile Header */}
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-3xl font-bold text-blue-600">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-4">
                            {user?.name}
                        </h2>
                    </div>

                    {/* User Details */}
                    <div className="border-t border-gray-200 mt-8 pt-8 space-y-5">

                        <div>
                            <p className="text-sm text-gray-500">
                                Full Name
                            </p>

                            <p className="font-medium text-gray-900 mt-1">
                                {user?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-medium text-gray-900 mt-1">
                                {user?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Account Type
                            </p>

                            <p className="font-medium text-gray-900 mt-1 capitalize">
                                {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <Link
                        to="/dashboard"
                        className="block text-center mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </main>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Edit Profile
                            </h2>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;