import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Services from './components/Services/Services.jsx'
import Team from './components/Team/Team.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import ServicesPage from './Pages/ServicesPage.jsx'
import Login from './Pages/Login.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AttorneyDashboard from './Pages/AttorneyDashboard.jsx'
import UsersPage from './Pages/UsersPage.jsx'
import MyBookings from './Pages/MyBookings.jsx'
import BookingsPage from './Pages/BookingsPage.jsx'
import BookConsultation from './Pages/BookConsultation.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth()
    if (loading) return <div style={{ padding: 24 }}>Loading...</div>
    if (!user) return <Navigate to="/login" replace />
    if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
    return children
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <About />
                                <Services />
                                <Team />
                                <Contact />
                            </>
                        } />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/book" element={<BookConsultation />} />
                        <Route path="/login" element={<Login />} />

                        {/* Role-based internal dashboards */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute roles={["admin", "attorney", "receptionist", "employee"]}>
                                {/* Route user to their dashboard */}
                                <RoleLanding />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard/users" element={
                            <ProtectedRoute roles={["admin"]}>
                                <UsersPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard/bookings" element={
                            <ProtectedRoute roles={["admin", "receptionist"]}>
                                <BookingsPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard/my-bookings" element={
                            <ProtectedRoute roles={["attorney"]}>
                                <MyBookings />
                            </ProtectedRoute>
                        } />
                    </Routes>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    )
}

const RoleLanding = () => {
    const { user } = useAuth()
    if (!user) return null
    if (user.role === 'admin' || user.role === 'receptionist') {
        return <AdminDashboard />
    }
    if (user.role === 'attorney') {
        return <AttorneyDashboard />
    }
    return <div style={{ padding: 24 }}>Welcome, {user.name || user.username}</div>
}

export default App