import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import BookHubContext from '../../context/BookHubContext'
import './index.css'

const Footer = () => (
  <BookHubContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? 'dark-theme' : 'light-theme'
      const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'

      return (
        <div className={`footer-container ${bgColor}`}>
          <div className={`responsive-footer ${bgColor}`}>
            <button type="button" className={`footer-buttons ${bgColor}`}>
              <FaGoogle className={textColor} size={18} />
            </button>
            <button type="button" className={`footer-buttons ${bgColor}`}>
              <FaTwitter className={textColor} size={18} />
            </button>
            <button type="button" className={`footer-buttons ${bgColor}`}>
              <FaInstagram className={textColor} size={18} />
            </button>
            <button type="button" className={`footer-buttons ${bgColor}`}>
              <FaYoutube className={textColor} size={18} />
            </button>
          </div>
          <p className={`contact-us-heading ${textColor}`}>Contact Us</p>
        </div>
      )
    }}
  </BookHubContext.Consumer>
)
export default Footer
