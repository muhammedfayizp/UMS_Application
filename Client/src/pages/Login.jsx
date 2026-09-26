import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slice/authSlice";
import { vallog } from "../validation/Lval";
import { toast } from "react-toastify";
import { userLogin } from "../services/authService";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [err, setErr] = useState({});


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setErr((prev) => ({
            ...prev,
            [e.target.name]: ''
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ValidErr = vallog(formData)

        if (Object.keys(ValidErr).length > 0) {
            setErr(ValidErr)
            return
        }

        try {
            const res = await userLogin(formData)

            dispatch(loginSuccess({
                user: res.data.data.existUser,
                token: res.data.data.accessToken
            }))

            let role = res.data.data.existUser.role
            if (role == 'admin') {
                navigate('/dashboard')
            } else {
                navigate('/profile')
            }

            toast.success(res.data.message)
        } catch (error) {
            toast.error(err.response?.data?.message || "internal server err");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">
                        Login to your account
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {err.name && (<p className="text-red-400 text-md">{err.name}</p>)}

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {err.email && (<p className="text-red-400 text-md">{err.email}</p>)}

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
