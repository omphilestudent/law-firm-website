import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const MyBookings = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('pending')

  const load = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`${API_URL}/appointments/mine?${params.toString()}`, { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load')
      setItems(data.data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [statusFilter])

  const act = async (id, action) => {
    try {
      const res = await fetch(`${API_URL}/appointments/${id}/${action}`, { method: 'PATCH', credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Action failed')
      await load()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <h2>My Bookings</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Status: </label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map(a => (
          <div key={a._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{a.name}</strong> — {a.service}
                <div style={{ color: '#555' }}>{new Date(a.preferredDate).toLocaleDateString()} at {a.preferredTime}</div>
                <div style={{ color: '#555' }}>Status: {a.status}</div>
              </div>
              {a.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => act(a._id, 'accept')}>Accept</button>
                  <button className="btn btn-outline" onClick={() => act(a._id, 'reject')}>Reject</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
