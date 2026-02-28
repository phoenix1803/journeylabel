import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo-link">
                            <span className="footer-logo-journey">Journey</span>
                            <span className="footer-logo-label">Label</span>
                        </Link>
                        <p className="footer-tagline">
                            Bespoke travel, designed around the moments
                            that matter most to you.
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/travelwithjourneylabel" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://www.facebook.com/journeylabel" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            <a href="https://in.linkedin.com/company/journeylabel" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-columns">
                        <div className="footer-column">
                            <h4>Useful Information</h4>
                            <Link to="/about">About Us</Link>
                            <Link to="/enquiry">Online Enquiry</Link>
                            <a href="#">Booking Conditions</a>
                            <a href="#">Careers</a>
                            <a href="#">FAQ</a>
                            <a href="#">Press Room</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Regenerative Travel</a>
                            <a href="#">Travel Insurance</a>
                        </div>

                        <div className="footer-column">
                            <h4>Popular Destinations</h4>
                            <Link to="/enquiry?destination=Argentina">Argentina</Link>
                            <Link to="/enquiry?destination=Canada">Canada</Link>
                            <Link to="/enquiry?destination=Chile">Chile</Link>
                            <Link to="/enquiry?destination=Iceland">Iceland</Link>
                            <Link to="/enquiry?destination=Italy">Italy</Link>
                            <Link to="/enquiry?destination=Japan">Japan</Link>
                            <Link to="/enquiry?destination=Kenya">Kenya</Link>
                            <Link to="/enquiry?destination=Morocco">Morocco</Link>
                            <Link to="/enquiry?destination=Peru">Peru</Link>
                            <Link to="/enquiry?destination=Thailand">Thailand</Link>
                            <Link to="/enquiry?destination=The+USA">The USA</Link>
                        </div>

                        <div className="footer-column">
                            <h4>Who</h4>
                            <Link to="/enquiry?occasion=Couples">Couples</Link>
                            <Link to="/enquiry?occasion=Family">Family</Link>
                            <Link to="/enquiry?occasion=Group">Group</Link>
                            <Link to="/enquiry?occasion=Honeymoon">Honeymoons</Link>
                            <Link to="/enquiry?occasion=Solo">Solo</Link>
                        </div>

                        <div className="footer-column">
                            <h4>What</h4>
                            <Link to="/enquiry?theme=Pursuit+of+Feeling">Pursuit of Feeling</Link>
                            <Link to="/enquiry?theme=Feelings+Engine">Feelings Engine</Link>
                            <Link to="/enquiry?theme=See+You+in+the+Moment">See You in the Moment</Link>
                            <Link to="/enquiry?theme=Take+Me+On+A+Story">Take Me On A Story</Link>
                            <Link to="/enquiry?theme=Adventures">Adventures</Link>
                            <Link to="/enquiry?theme=Beach">Beach</Link>
                            <Link to="/enquiry?theme=Safari">Safari</Link>
                            <Link to="/enquiry?theme=Food">Food</Link>
                            <Link to="/enquiry?theme=Eclipse">Eclipse</Link>
                            <Link to="/enquiry?theme=Get+Lost">Get Lost</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2018 — {new Date().getFullYear()} JourneyLabel Private Limited. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Settings</a>
                        <a href="#">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
