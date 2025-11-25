import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const AttorneyDashboard = () => {
  const { user, logout } = useAuth()
  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Attorney Dashboard</h2>
        <div>
          <span style={{ marginRight: 12 }}>Signed in as {user?.name || user?.username} ({user?.role})</span>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <Link className="btn btn-primary" to="/dashboard/my-bookings">My Bookings</Link>
      </div>
    </div>
  )
}

export default AttorneyDashboard
