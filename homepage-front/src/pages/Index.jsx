import Landing from '../components/Landing'
import AboutUs from '../components/AboutUs'
import Announcements from '../components/Announcements'
import ImagesHavingFun from '../components/ImagesHavingFun'
import Services from '../components/Services'
import Gallery from '../components/Gallery'

const Index = () => {
  return (
    
    <section className="flex flex-col gap-16"> 
      <Landing />
      <AboutUs />
      <Services />
      <Announcements />
    </section>
  )
}

export default Index
