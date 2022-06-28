import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import BooksSlider from '../BooksSlider'
import BookHubThemeContext from '../../context/BookHubThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {booksList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBooks()
  }

  formattedData = book => ({
    id: book.id,
    coverPic: book.cover_pic,
    title: book.title,
    authorName: book.author_name,
  })

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const getBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const response = await fetch(getBooksUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      /* console.log(fetchedData) */
      const updatedList = fetchedData.books.map(eachBook =>
        this.formattedData(eachBook),
      )
      this.setState({
        booksList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getBooks()
  }

  renderSlider = () => (
    <BookHubThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const sliderBgColor = isDarkTheme ? 'dark-slider' : 'slider-theme-light'
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const {booksList} = this.state
        return (
          <>
            <div className="responsive-home">
              <h1 className={`heading ${textColor}`}>
                Find Your Next Favorite Books?
              </h1>
              <p className={`description ${textColor}`}>
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <div className="mobile-view-find-button">
                <Link to="/shelf">
                  <button type="button" className="find-books-button">
                    Find Books
                  </button>
                </Link>
              </div>
              <div className={`top-rated-books-container ${sliderBgColor}`}>
                <div className="top-rated-books-find-books">
                  <h1 className={`top-rated-books-heading ${textColor}`}>
                    Top Rated Books
                  </h1>
                  <div className="desktop-view-find-button">
                    <Link to="/shelf">
                      <button type="button" className="find-books-button">
                        Find Books
                      </button>
                    </Link>
                  </div>
                </div>

                {booksList.length === 0 ? (
                  this.renderFailureView()
                ) : (
                  <div
                    className={`top-rated-books-carousel-container ${sliderBgColor}`}
                  >
                    <BooksSlider booksList={booksList} textColor={textColor} />
                  </div>
                )}
              </div>
              <Footer />
            </div>
          </>
        )
      }}
    </BookHubThemeContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <BookHubThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        return (
          <div className="home-failure-view-container">
            <img
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940772/Group_7522Failure_Image_ykvhlm.png"
              className="home-failure-image"
              alt="failure view"
            />
            <p className={`${textColor} home-failure-heading`}>
              Something went wrong, Please try again.
            </p>

            <button
              type="button"
              onClick={this.onClickTryAgain}
              className="home-try-again-button"
            >
              Try Again
            </button>
          </div>
        )
      }}
    </BookHubThemeContext.Consumer>
  )

  renderBooksListBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <BookHubThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'dark-theme' : 'light-theme'
          return (
            <>
              <Header />
              <div className={`home-container ${bgColor}`}>
                {this.renderBooksListBasedOnApiStatus()}
              </div>
            </>
          )
        }}
      </BookHubThemeContext.Consumer>
    )
  }
}
export default Home
