import Hero from '../components/Hero/Hero'
import Spotlight from '../components/Spotlight/Spotlight'
import Intro from '../components/Intro/Intro'
import Destinations from '../components/Destinations/Destinations'
import Philosophy from '../components/Philosophy/Philosophy'
import Connoisseur from '../components/Connoisseur/Connoisseur'
import Experiences from '../components/Experiences/Experiences'
import WorldMap from '../components/WorldMap/WorldMap'
import Testimonials from '../components/Testimonials/Testimonials'
import Gallery from '../components/Gallery/Gallery'
import CTA from '../components/CTA/CTA'
import DestinationSlider from '../components/DestinationSlider/DestinationSlider'

const Home = () => {
    return (
        <>
            <Hero />
            <Spotlight />
            <Intro />
            <Destinations />
            <Philosophy />
            <Connoisseur />
            <Experiences />
            <WorldMap />
            <Testimonials />
            <Gallery />
            <CTA />
            <DestinationSlider />
        </>
    )
}

export default Home
