import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const BookingsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const search = new URLSearchParams(location.search)
  const initDate = search.get('date') || ''
  const initStatus = search.get('status') || 'pending'
  const initAssigned = search.get('assigned') || ''
  const [date, setDate] = useState(initDate)
  const [status, setStatus] = useState(initStatus)
  const [assigned, setAssigned] = useState(initAssigned) // '', 'assigned', 'unassigned'
  const [users, setUsers] = useState([])

  const load = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (date) params.set('date', date)
      if (status) params.set('status', status)
      if (assigned) params.set('assigned', assigned)
      const res = await fetch(`${API_URL}/appointments?${params.toString()}`, { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load appointments')
      setItems(data.data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setUsers(data.data || [])
    } catch {}
  }

  useEffect(() => { loadUsers() }, [])
  useEffect(() => { load() }, [date, status, assigned])

  // keep URL in sync when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (date) params.set('date', date)
    if (status) params.set('status', status)
    if (assigned) params.set('assigned', assigned)
    navigate({ pathname: '/dashboard/bookings', search: params.toString() ? `?${params.toString()}` : '' }, { replace: true })
  }, [date, status, assigned])

  const attorneys = useMemo(() => users.filter(u => u.role === 'attorney' && u.active), [users])

  const assign = async (appointmentId, attorneyId) => {
    try {
      const res = await fetch(`${API_URL}/appointments/${appointmentId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ attorneyId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to assign')
      await load()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <h2>Bookings</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label>Status: </label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Assignment: </label>
          <select value={assigned} onChange={e => setAssigned(e.target.value)}>
            <option value="">All</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map(a => (
          <div key={a._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <strong>{a.name}</strong> — {a.service}
                <div style={{ color: '#555' }}>{new Date(a.preferredDate).toLocaleDateString()} at {a.preferredTime}</div>
                <div style={{ color: '#555' }}>Status: {a.status}</div>
                {a.preferredAttorney && <div style={{ color: '#777' }}>Preferred: {a.preferredAttorney}</div>}
              </div>
              <div>
                <label style={{ marginRight: 8 }}>Assign attorney:</label>
                <select value={a.assignedAttorney || ''} onChange={e => assign(a._id, e.target.value)}>
                  <option value="">Unassigned</option>
                  {attorneys.map(at => (
                    <option key={at._id} value={at._id}>{at.name || at.username}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
