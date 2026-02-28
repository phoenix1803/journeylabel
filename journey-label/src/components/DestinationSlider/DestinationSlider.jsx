import InfiniteSlider from '../InfiniteSlider/InfiniteSlider'
import './DestinationSlider.css'

const destinations = [
    { name: 'Maldives', img: '/images/maldives.jpg' },
    { name: 'Santorini', img: '/images/santorini.jpg' },
    { name: 'Swiss Alps', img: '/images/swiss-alps.jpg' },
    { name: 'Safari', img: '/images/safari.jpg' },
    { name: 'New South Wales', img: '/images/nsw-hero.jpg' },
    { name: 'Cultural Journey', img: '/images/experience-culture.jpg' },
    { name: 'Island Escape', img: '/images/experience-island.jpg' },
    { name: 'Wellness Retreat', img: '/images/experience-wellness.jpg' },
]

const DestinationSlider = () => {
    return (
        <section className="destination-slider-section">
            <div className="destination-slider-header">
                <span className="destination-slider-label">Destination Spotlight</span>
            </div>
            <InfiniteSlider gap={24} reverse duration={30} className="destination-slider">
                {destinations.map((dest) => (
                    <div key={dest.name} className="slider-card">
                        <img src={dest.img} alt={dest.name} className="slider-card-img" />
                        <div className="slider-card-overlay">
                            <span className="slider-card-name">{dest.name}</span>
                        </div>
                    </div>
                ))}
            </InfiniteSlider>
        </section>
    )
}

export default DestinationSlider
