import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(username, password)
    setLoading(false)
    if (res.ok) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(res.message || 'Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Internal Sign In</h2>
      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. admins-inc" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Login
