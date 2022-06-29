import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import BooksSlider from '../BooksSlider'
import BookHubContext from '../../context/BookHubContext'

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
    this.getTopRatedBooks()
  }

  formattedData = book => ({
    id: book.id,
    coverPic: book.cover_pic,
    title: book.title,
    authorName: book.author_name,
  })

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    /* Loader should be displayed while fetching the data */

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const getTopRatedBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    /* When an authenticated user opens the Home Route, 
  An HTTP GET request should be made to Top Rated Books API URL with jwt_token in the Cookies */

    const response = await fetch(getTopRatedBooksUrl, options)
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
    this.getTopRatedBooks()
  }

  /* Inprogress View */

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  /* Failure View */

  /* If the HTTP GET request made is unsuccessful, then the failure should be displayed */

  renderFailureView = () => (
    <BookHubContext.Consumer>
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

            {/* When the Try Again button is clicked, 
            an HTTP GET request should be made to Top Rated Books API URL */}

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
    </BookHubContext.Consumer>
  )

  /* Success View */

  renderSuccessView = () => (
    <BookHubContext.Consumer>
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
                {/* When the Find Books button is clicked,
               then the page should be navigated to the Bookshelves Route */}

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
                    {/* When the Find Books button is clicked,
               then the page should be navigated to the Bookshelves Route */}

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
                    <BooksSlider booksList={booksList} />
                  </div>
                )}
              </div>
              <Footer />
            </div>
          </>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderBooksListBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
      <BookHubContext.Consumer>
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
      </BookHubContext.Consumer>
    )
  }
}
export default Home
