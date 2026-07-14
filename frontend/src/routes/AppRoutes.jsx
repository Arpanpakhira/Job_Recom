import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import JobListings from "../pages/JobListings";
import CourseListings from "../pages/CourseListings";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/common/ProtectedRoute";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={
                <ProtectedRoute>
                    <Upload />
                </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/analytics" element={
                <ProtectedRoute>
                    <Analytics />
                </ProtectedRoute>
            } />
            <Route path="/jobs" element={
                <ProtectedRoute>
                    <JobListings />
                </ProtectedRoute>
            } />
            <Route path="/courses" element={
                <ProtectedRoute>
                    <CourseListings />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}