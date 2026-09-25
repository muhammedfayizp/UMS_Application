import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<PublicRoute />}>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes