import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { valEdit } from "../validation/editVal";
import { toast } from "react-toastify";
import { editUser, getUsers } from "../services/userService";
import { updateUser } from "../redux/slice/authSlice";

const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
    const isUser = user?.role === "user";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editErr, setEditErr] = useState({});
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setEditErr({
            ...editErr,
            [e.target.name]: "",
        });
    };

    const handleEdit = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });

        setEditErr({});
        setIsModalOpen(true);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await getUsers();

            setFormData({
                name: res.data.data.name || "",
                email: res.data.data.email || "",
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);

            toast.error(
                error.response?.data?.message || "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    };
    const hasChanges =
        formData.name !== (user?.name || "") ||
        formData.email !== (user?.email || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasChanges) {
            return;
        }

        const validEdit = valEdit(formData);

        if (Object.keys(validEdit).length > 0) {
            setEditErr(validEdit);
            return;
        }

        try {
            const res = await editUser(user._id, formData);

            toast.success(
                res.data.message || "Profile updated successfully"
            );

            dispatch(updateUser(res.data.data));
            setIsModalOpen(false);

            setEditErr({});

            fetchUsers();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Internal server error"
            );
        }
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-10">

                <div className="bg-white rounded-2xl shadow-sm p-8 relative">

                    {isUser && (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
                            title="Edit Profile"
                        >
                            ✏️
                        </button>
                    )}

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

                    <Link
                        to="/dashboard"
                        className="block text-center mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

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

                        <form onSubmit={handleSubmit}>

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
                                {editErr.name && (<p className="text-red-400 text-md">{editErr.name}</p>)}

                            </div>

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
                                {editErr.email && (<p className="text-red-400 text-md">{editErr.email}</p>)}

                            </div>

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
                                    disabled={!hasChanges}
                                    className={`flex-1 py-3 rounded-lg text-white ${hasChanges
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                        }`}
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
