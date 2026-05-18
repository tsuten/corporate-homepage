import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import SpecificPageLayout from '../components/SpecificPageLayout'

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([])
  useEffect(() => {
    api.get('/announcement').then((response) => {
      setAnnouncements(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <SpecificPageLayout title="Announcements">
      <div className="flex flex-col gap-8 px-8 pb-8">
        {announcements.map((announcement) => (
          <div key={announcement.id}>
            <h2>{announcement.title}</h2>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </SpecificPageLayout>
  )
}

export default Announcement
