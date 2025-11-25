import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const AdminDashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: 12 }}>Signed in as {user?.name || user?.username} ({user?.role})</span>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
        <Card title="User Management" description="Create and manage internal users and roles">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/dashboard/users">Open Users</Link>
            <Link className="btn btn-outline" to="/dashboard/users?new=1">Add User</Link>
          </div>
        </Card>
        <Card title="Bookings" description="View and assign booking requests">
          <Link className="btn btn-primary" to="/dashboard/bookings">Open Bookings</Link>
        </Card>
      </div>
    </div>
  )
}

const Card = ({ title, description, children }) => (
  <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
    <h3 style={{ marginTop: 0 }}>{title}</h3>
    <p style={{ color: '#555' }}>{description}</p>
    {children}
  </div>
)

export default AdminDashboard
