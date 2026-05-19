import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { formatTimestamp } from '../utils/formatDate'

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
    <section id="announcements" className="w-full px-4 py-8 text-left">
      <h1 className="pb-4 text-2xl font-medium tracking-tight text-zinc-900 text-start px-4">Announcements</h1>
      <ul>
        {announcements.toReversed().map((announcement) => (
          <li key={announcement.id}>
            <Link
              to={`/announcements/${announcement.id}`}
              className="flex flex-col gap-1 rounded-xl p-4 transition-colors duration-300 hover:bg-zinc-100"
            >
              <div className="text-sm tabular-nums text-zinc-600">
                {formatTimestamp(announcement.created_at)}
              </div>
              <h2 className="text-lg font-medium leading-snug text-zinc-900">{announcement.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Announcements