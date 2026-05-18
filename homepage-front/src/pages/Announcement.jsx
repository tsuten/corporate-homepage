import SpecificPageLayout from '../components/SpecificPageLayout'
import BreadCrumb from '../components/BreadCrumb'
import Announcements from '../components/Announcements'

const Announcement = () => {
  return (
    <SpecificPageLayout title="Announcements" showTitle={false}>
      <BreadCrumb items={[{ label: 'ホーム', to: '/' }, { label: 'お知らせ' }]} />
      <Announcements />
    </SpecificPageLayout>
  )
}

export default Announcement
