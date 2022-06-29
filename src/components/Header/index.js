import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {MdMenu} from 'react-icons/md'
import {FcHome} from 'react-icons/fc'
import {ImBooks} from 'react-icons/im'
import {AiOutlineClose} from 'react-icons/ai'
import {FiLogOut, FiSun} from 'react-icons/fi'
import Cookies from 'js-cookie'
import BookHubContext from '../../context/BookHubContext'

import './index.css'

class Header extends Component {
  state = {isMobileView: true}

  onClickCloseIcon = () => {
    this.setState(prevState => ({
      isMobileView: !prevState.isMobileView,
    }))
  }

  onClickMenuIcon = () => {
    this.setState(prevState => ({
      isMobileView: !prevState.isMobileView,
    }))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isMobileView} = this.state
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme, onClickThemeIcon} = value

          const bgColor = isDarkTheme
            ? 'header-dark-theme'
            : 'header-light-theme'
          const textColor = !isDarkTheme
            ? 'light-theme-text'
            : 'dark-theme-text'

          const onClickThemeButton = () => {
            onClickThemeIcon()
          }

          return (
            <nav className={`navbar ${bgColor}`}>
              <div className={`header-responsive-navbar ${bgColor}`}>
                {/* When the Book Hub logo in the header is clicked,
               then the page should be navigated to the Home Route */}

                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940745/Group_7731Website_Logo_o1zltx.png"
                    className="website-logo"
                    alt="website logo"
                  />
                </Link>

                <ul className="nav-items-container">
                  {/* When the Home link in the header is clicked,
                 then the page should be navigated to the Home Route */}

                  <Link to="/" className="nav-links">
                    <li className={`nav-text ${textColor}`}>Home</li>
                  </Link>
                  {/* When the Bookshelves link in the header is clicked,
                   then the page should be navigated to the Bookshelves Route */}

                  <Link to="/shelf" className="nav-links">
                    <li className={`nav-text ${textColor}`}>Bookshelves</li>
                  </Link>
                  {/* When the Sun Icon in the header is clicked,
                   then the page Theme changes to Light or Dark Color */}

                  <button
                    type="button"
                    onClick={onClickThemeButton}
                    className="theme-button"
                  >
                    <FiSun className={textColor} size={25} />
                  </button>
                  {/* When the Logout button in the header is clicked,
                   then the page should be navigated to the Login Route */}

                  <Link to="/login" className="nav-links">
                    <li>
                      <button
                        type="button"
                        onClick={this.onClickLogout}
                        className="logout-button"
                      >
                        Logout
                      </button>
                    </li>
                  </Link>
                </ul>
                {isMobileView ? (
                  <button
                    type="button"
                    className="menu-icon"
                    onClick={this.onClickMenuIcon}
                  >
                    <MdMenu className={textColor} size={20} />
                  </button>
                ) : (
                  <ul className="mobile-nav-items-container">
                    <button
                      type="button"
                      className="close-icon"
                      onClick={this.onClickCloseIcon}
                    >
                      <AiOutlineClose className={textColor} size={20} />
                    </button>

                    <Link to="/" className="nav-links">
                      <FcHome size={25} className="mobile-view-icon" />
                    </Link>
                    <Link to="/shelf" className="nav-links">
                      <ImBooks size={25} className="mobile-view-icon" />
                    </Link>
                    <button
                      type="button"
                      onClick={onClickThemeButton}
                      className="theme-button"
                    >
                      <FiSun
                        className={`mobile-view-icon ${textColor}`}
                        size={25}
                      />
                    </button>
                    <Link to="/login" className="nav-links">
                      <FiLogOut
                        size={25}
                        className="mobile-view-icon"
                        onClick={this.onClickLogout}
                      />
                    </Link>
                  </ul>
                )}
              </div>
            </nav>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default withRouter(Header)
