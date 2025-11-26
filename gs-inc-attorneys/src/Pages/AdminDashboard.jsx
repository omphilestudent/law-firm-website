import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [counts, setCounts] = useState({
    total: 0,
    assigned: 0,
    unassigned: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/appointments/admin/counts`, { credentials: 'include' })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load counts')
        if (!ignore) setCounts(data.data || {})
      } catch (e) {
        if (!ignore) setError(e.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  const goToBookings = (params) => {
    const sp = new URLSearchParams()
    if (params?.status) sp.set('status', params.status)
    if (params?.assigned) sp.set('assigned', params.assigned)
    navigate({ pathname: '/dashboard/bookings', search: sp.toString() ? `?${sp.toString()}` : '' })
  }

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: 12 }}>Signed in as {user?.name || user?.username} ({user?.role})</span>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 }}>
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

      {/* Summary panels */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ margin: '8px 0 12px' }}>Appointments Overview</h3>
        {loading && <p>Loading summary…</p>}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16
          }}>
            <StatCard label="Total" value={counts.total} color="#0d6efd" onClick={() => goToBookings({})} />
            <StatCard label="Assigned" value={counts.assigned} color="#20c997" onClick={() => goToBookings({ assigned: 'assigned' })} />
            <StatCard label="Unassigned" value={counts.unassigned} color="#6c757d" onClick={() => goToBookings({ assigned: 'unassigned' })} />
            <StatCard label="Pending" value={counts.pending} color="#ffc107" onClick={() => goToBookings({ status: 'pending' })} />
            <StatCard label="Accepted" value={counts.accepted} color="#0dcaf0" onClick={() => goToBookings({ status: 'accepted' })} />
            <StatCard label="Rejected" value={counts.rejected} color="#dc3545" onClick={() => goToBookings({ status: 'rejected' })} />
            <StatCard label="Confirmed" value={counts.confirmed} color="#198754" onClick={() => goToBookings({ status: 'confirmed' })} />
            <StatCard label="Cancelled" value={counts.cancelled} color="#6610f2" onClick={() => goToBookings({ status: 'cancelled' })} />
            <StatCard label="Completed" value={counts.completed} color="#6f42c1" onClick={() => goToBookings({ status: 'completed' })} />
            {/* Alias for business wording */}
            <StatCard label="Resolved" value={counts.completed} color="#6f42c1" onClick={() => goToBookings({ status: 'completed' })} subtle />
          </div>
        )}
      </div>
    </div>
  )
}

const Card = ({ title, description, children }) => (
  <div style={{ border: '1px solid #e9ecef', borderRadius: 10, padding: 16, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
    <h3 style={{ marginTop: 0 }}>{title}</h3>
    <p style={{ color: '#555' }}>{description}</p>
    {children}
  </div>
)

const StatCard = ({ label, value, color = '#0d6efd', onClick, subtle = false }) => (
  <button
    onClick={onClick}
    className="stat-card"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 16,
      borderRadius: 12,
      border: '1px solid #e9ecef',
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      outline: 'none'
    }}
  >
    <span style={{ fontSize: 12, color: '#6c757d' }}>{label}</span>
    <strong style={{ fontSize: 28, color: subtle ? '#6c757d' : color }}>{value}</strong>
    <span style={{ marginTop: 8, fontSize: 12, color: '#0d6efd', opacity: 0.9 }}>View {label.toLowerCase()}</span>
  </button>
)

export default AdminDashboard
