import { useState, useEffect } from 'react'
import { api } from '../utils/api'

const About = () => {
  const [announcements, setAnnouncements] = useState([])
  useEffect(() => {
    api.get('/announcement').then((response) => {
      setAnnouncements(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <section style={{ padding: '1rem 2rem' }}>
      <h1>About</h1>
      <p>Add company or site information here.</p>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>{announcement.title}</li>
        ))}
      </ul>
    </section>
  )
}

export default About
