import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    MyApp
                </Link>

                <div className="flex items-center gap-2">

                    <Link
                        to="/dashboard"
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            isActive("/dashboard")
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            isActive("/profile")
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Profile
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;