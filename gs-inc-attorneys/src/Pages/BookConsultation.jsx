import React, { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const services = [
  { value: 'consultation', label: 'General Consultation' },
  { value: 'civil-litigation', label: 'Civil & Commercial Litigation' },
  { value: 'corporate-commercial', label: 'Corporate & Commercial Law' },
  { value: 'labor-employment', label: 'Employment & Labour Law' },
  { value: 'debt-collection', label: 'Debt Collection & Recovery' },
  { value: 'aviation-law', label: 'Aviation Law' },
  { value: 'local-government', label: 'Local Government Law' },
  { value: 'property-real-estate', label: 'Real Estate & Property Law' },
  { value: 'criminal-law', label: 'Criminal Law & Litigation' },
  { value: 'investigations', label: 'Investigations' },
]

const todayISO = () => {
  const d = new Date()
  d.setHours(0,0,0,0)
  return d.toISOString().split('T')[0]
}

const isWeekday = (isoDate) => {
  const d = new Date(isoDate)
  const dow = d.getDay() // 0=Sun,6=Sat
  return dow >= 1 && dow <= 5
}

const BookConsultation = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('consultation')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('60min')
  const [meetingType, setMeetingType] = useState('in-person')
  const [preferredAttorney, setPreferredAttorney] = useState('any')
  const [message, setMessage] = useState('')

  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  const minDate = useMemo(() => todayISO(), [])

  useEffect(() => {
    const load = async () => {
      setSlotsError('')
      setSlots([])
      setTime('')
      if (!date) return
      if (!isWeekday(date)) {
        setSlotsError('Bookings are only available Monday to Friday.')
        return
      }
      setSlotsLoading(true)
      try {
        const res = await fetch(`${API_URL}/appointments/available-slots?date=${encodeURIComponent(date)}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load available slots')
        setSlots(data.data?.availableSlots || [])
      } catch (e) {
        setSlotsError(e.message)
      } finally {
        setSlotsLoading(false)
      }
    }
    load()
  }, [date])

  const validate = () => {
    if (!name.trim()) return 'Please provide your name'
    if (!email.match(/^\S+@\S+\.[\w.]+$/)) return 'Please provide a valid email'
    if (!phone.trim()) return 'Please provide your phone number'
    if (!date) return 'Please select a date'
    if (!isWeekday(date)) return 'Please select a weekday (Mon–Fri)'
    if (!time) return 'Please select a time slot'
    return ''
  }

  const submit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setFormError(err); return }
    setFormError('')
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase(),
          phone: phone.trim(),
          service,
          preferredDate: date,
          preferredTime: time,
          message: message.trim(),
          preferredAttorney: preferredAttorney || 'any',
          meetingType,
          duration,
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to submit booking')
      setSubmitted({
        name,
        date: data.data?.preferredDate || date,
        time: data.data?.preferredTime || time,
        service
      })
    } catch (e) {
      setFormError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 720, margin: '32px auto', padding: 16 }}>
        <h2>Thank you, {submitted.name}!</h2>
        <p>Your consultation request has been received. A confirmation email has been sent. Our team will contact you within 24 hours to confirm your appointment.</p>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fafafa' }}>
          <div><strong>Service:</strong> {services.find(s => s.value === submitted.service)?.label || submitted.service}</div>
          <div><strong>Date:</strong> {new Date(submitted.date).toLocaleDateString()}</div>
          <div><strong>Time:</strong> {submitted.time}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '32px auto', padding: 16 }}>
      <h2>Book a Consultation</h2>
      <p style={{ color: '#555' }}>Choose a weekday between 08:00 and 17:00. Available slots update after selecting a date.</p>

      {formError && <div style={{ color: 'crimson', marginBottom: 12 }}>{formError}</div>}

      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          <div>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
          </div>
          <div>
            <label>Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} required style={{ width: '100%', padding: 8 }} />
          </div>
          <div>
            <label>Service</label>
            <select value={service} onChange={e => setService(e.target.value)} style={{ width: '100%', padding: 8 }}>
              {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label>Date</label>
            <input type="date" min={minDate} value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: 8 }} />
          </div>
          <div>
            <label>Time</label>
            <select value={time} onChange={e => setTime(e.target.value)} disabled={!date || slotsLoading || !!slotsError} style={{ width: '100%', padding: 8 }}>
              <option value="">{slotsLoading ? 'Loading slots…' : 'Select a time'}</option>
              {slots.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {slotsError && <div style={{ color: 'crimson', fontSize: 13 }}>{slotsError}</div>}
          </div>
          <div>
            <label>Preferred Attorney (optional)</label>
            <select value={preferredAttorney} onChange={e => setPreferredAttorney(e.target.value)} style={{ width: '100%', padding: 8 }}>
              <option value="any">Any available attorney</option>
              <option value="julius">Julius Galananzhele</option>
              <option value="shimane">Shimane Sebela</option>
            </select>
          </div>
          <div>
            <label>Meeting Type</label>
            <select value={meetingType} onChange={e => setMeetingType(e.target.value)} style={{ width: '100%', padding: 8 }}>
              <option value="in-person">In person</option>
              <option value="phone">Phone</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label>Duration</label>
            <select value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', padding: 8 }}>
              <option value="30min">30 minutes</option>
              <option value="60min">60 minutes</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Additional notes (optional)</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} style={{ width: '100%', padding: 8 }} />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Book Consultation'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookConsultation
