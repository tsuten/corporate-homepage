import { useState, useEffect } from 'react'
import { api } from '../utils/api'

function formatTimestamp(value) {
  if (value == null || value === '') return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  useEffect(() => {
    api.get('/announcement').then((response) => {
      setAnnouncements(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <section id="announcements" className="container mx-auto px-4 py-8 text-left sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-medium tracking-tight text-zinc-900 text-start">Announcements</h1>
      <ul>
        {announcements.toReversed().map((announcement) => (
          <li key={announcement.id} className="mb-4 flex flex-col gap-1 rounded-md p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-zinc-100">
            <div className="text-sm tabular-nums text-zinc-600">
              {formatTimestamp(announcement.created_at)}
            </div>
            <h2 className="text-lg font-medium leading-snug text-zinc-900">{announcement.title}</h2>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Announcements