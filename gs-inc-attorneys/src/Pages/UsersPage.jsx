import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const newFlag = params.get('new') === '1'

  const [showCreate, setShowCreate] = useState(newFlag)

  // Create form state
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('employee')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/users`, { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load users')
      setUsers(data.data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  // keep showCreate in sync with query param
  useEffect(() => {
    setShowCreate(newFlag)
  }, [newFlag])

  const derivedUsername = React.useMemo(() => {
    if (!email) return ''
    const local = email.split('@')[0]?.toLowerCase() || ''
    return local.replace(/[^a-z0-9._-]/g, '')
  }, [email])

  const fullName = React.useMemo(() => {
    const a = firstName.trim()
    const b = surname.trim()
    return [a, b].filter(Boolean).join(' ')
  }, [firstName, surname])

  const openCreate = () => {
    const p = new URLSearchParams(location.search)
    p.set('new', '1')
    navigate({ pathname: location.pathname, search: p.toString() }, { replace: false })
    setShowCreate(true)
  }

  const closeCreate = () => {
    setShowCreate(false)
    const p = new URLSearchParams(location.search)
    p.delete('new')
    navigate({ pathname: location.pathname, search: p.toString() }, { replace: true })
    setFirstName('')
    setSurname('')
    setEmail('')
    setRole('employee')
    setPassword('')
    setPassword2('')
    setFormError('')
  }

  const createUser = async (e) => {
    e.preventDefault()
    setFormError('')
    // simple validation
    if (!firstName.trim() || !surname.trim()) return setFormError('First name and surname are required')
    if (!email.match(/^\S+@\S+\.[\w.]+$/)) return setFormError('Please provide a valid email')
    if (!['admin','attorney','receptionist','employee'].includes(role)) return setFormError('Please select a valid role')
    if (password.length < 8) return setFormError('Password must be at least 8 characters')
    if (password !== password2) return setFormError('Passwords do not match')
    if (!derivedUsername) return setFormError('Could not derive a username from the email')

    setFormLoading(true)
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: derivedUsername,
          name: fullName,
          email: email.toLowerCase(),
          role,
          password,
          active: true
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create user')
      await fetchUsers()
      closeCreate()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  const counts = useMemo(() => {
    const c = { admin: 0, attorney: 0, receptionist: 0, employee: 0 }
    users.forEach(u => { c[u.role] = (c[u.role] || 0) + 1 })
    return c
  }, [users])

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0 }}>Users</h2>
        <div>
          <button className="btn btn-primary" onClick={openCreate}>Add User</button>
        </div>
      </div>
      {loading && <p>Loading users…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {showCreate && (
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, margin: '16px 0' }}>
          <h3 style={{ marginTop: 0 }}>Add User</h3>
          {formError && <div style={{ color: 'crimson', marginBottom: 12 }}>{formError}</div>}
          <form onSubmit={createUser}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              <div>
                <label>First name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              <div>
                <label>Surname</label>
                <input value={surname} onChange={e => setSurname(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              <div>
                <label>Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: 8 }}>
                  <option value="employee">Employee</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="attorney">Attorney</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8 }} placeholder="min 8 characters" />
              </div>
              <div>
                <label>Confirm password</label>
                <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              <div>
                <label>Derived username</label>
                <input value={derivedUsername} readOnly style={{ width: '100%', padding: 8, background: '#f8f8f8' }} />
              </div>
              <div>
                <label>Full name</label>
                <input value={fullName} readOnly style={{ width: '100%', padding: 8, background: '#f8f8f8' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button type="submit" className="btn btn-primary" disabled={formLoading}>{formLoading ? 'Creating…' : 'Create User'}</button>
              <button type="button" className="btn btn-outline" onClick={closeCreate} disabled={formLoading}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <Badge label="Admins" value={counts.admin} />
        <Badge label="Attorneys" value={counts.attorney} />
        <Badge label="Receptionists" value={counts.receptionist} />
        <Badge label="Employees" value={counts.employee} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <Th>Username</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Last Login</Th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderTop: '1px solid #eee' }}>
                <Td>{u.username}</Td>
                <Td>{u.name || '-'}</Td>
                <Td>{u.email || '-'}</Td>
                <Td>{u.phone || '-'}</Td>
                <Td>{u.role}</Td>
                <Td>
                  <span style={{ color: u.active ? 'green' : 'gray' }}>{u.active ? 'Active' : 'Inactive'}</span>
                </Td>
                <Td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : '-'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Badge = ({ label, value }) => (
  <div style={{ background: '#f5f5f5', padding: '6px 10px', borderRadius: 20, fontSize: 14 }}>
    {label}: <strong>{value}</strong>
  </div>
)

const Th = ({ children }) => (
  <th style={{ textAlign: 'left', padding: 8, fontWeight: 600, fontSize: 14, color: '#333' }}>{children}</th>
)
const Td = ({ children }) => (
  <td style={{ padding: 8, fontSize: 14 }}>{children}</td>
)

export default UsersPage
