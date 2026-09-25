import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);

    const isAdmin = user?.role === "admin";

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@gmail.com",
            role: "user",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@gmail.com",
            role: "user",
        },
        {
            id: 3,
            name: "Admin User",
            email: "admin@gmail.com",
            role: "admin",
        },
    ]);
    const fetchUsers = async () => {
        try {
            const res = await getUsers()
            setUsers(res.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    const handleDeleteUser = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
        );

        toast.success("User deleted successfully");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Welcome back!
                    </p>
                </div>

                {/* Admin Section */}
                {isAdmin && (
                    <>
                        {/* Total Users */}
                        <div className="mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <p className="text-gray-500">
                                    Total Users
                                </p>

                                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                    {users.length}
                                </h3>
                            </div>
                        </div>

                        {/* User List */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    All Users
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    Manage registered users
                                </p>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">

                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Name
                                            </th>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Email
                                            </th>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Role
                                            </th>

                                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {users.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {item.email}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.role === "admin"
                                                                ? "bg-purple-100 text-purple-700"
                                                                : "bg-blue-100 text-blue-700"
                                                            }`}
                                                    >
                                                        {item.role}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    {item.id !== user?.id && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    item.id
                                                                )
                                                            }
                                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            {/* Empty state */}
                            {users.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">
                                        No users found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {!isAdmin && (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Welcome to your dashboard
                        </h3>

                        <p className="text-gray-500 mt-2">
                            You can manage your account, view your profile,
                            and access your application from here.
                        </p>

                        <Link
                            to="/profile"
                            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            View Profile
                        </Link>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Dashboard;