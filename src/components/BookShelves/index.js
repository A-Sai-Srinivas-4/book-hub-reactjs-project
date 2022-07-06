import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import BookHubContext from '../../context/BookHubContext'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    labelValue: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    labelValue: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    labelValue: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    labelValue: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    searchInput: '',
    searchText: '',
    /* The page should initially consist of All Books heading */
    bookShelfName: bookshelvesList[0].labelValue,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  formattedData = book => ({
    id: book.id,
    title: book.title,
    authorName: book.author_name,
    readStatus: book.read_status,
    coverPic: book.cover_pic,
    rating: book.rating,
  })

  getBooks = async () => {
    /* Loader should be displayed while fetching the data */
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookShelfName, searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelfName}&search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    /* When an authenticated user opens the Bookshelves Route
    An HTTP GET request should be made to Books API URL with jwt_token
    in the Cookies and query parameters shelf and search with initial
    values as ALL and empty string respectively */

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedList = fetchedData.books.map(eachBook =>
        this.formattedData(eachBook),
      )
      /* console.log(updatedList) */

      this.setState({
        booksList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickShelfItem = value => {
    this.setState({bookShelfName: value}, this.getBooks)
  }

  onChangeSearchText = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.getBooks)
  }

  onClickTryAgain = () => {
    this.getBooks()
  }

  renderBookShelvesListSection = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColor = isDarkTheme
          ? 'shelf-list-dark-theme'
          : 'list-light-theme'
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const buttonText = isDarkTheme
          ? 'shelf-button-dark-text'
          : 'shelf-button-light-text'

        return (
          <div className={`books-shelves-list-container ${bgColor}`}>
            <h1 className={`bookshelves-heading ${textColor}`}>Bookshelves</h1>
            <ul className="book-shelves-list">
              {bookshelvesList.map(eachType => {
                const {label, labelValue} = eachType
                const onClickShelf = () => {
                  this.onClickShelfItem(labelValue)
                }
                const {bookShelfName} = this.state
                const isActive = labelValue === bookShelfName
                console.log(isActive)
                const textStyle = isActive
                  ? 'active-shelf-button'
                  : 'shelf-button'
                return (
                  /* After the data is fetched successfully,
                   display the list of books received from the response */
                  <li key={eachType.id} className="book-shelf">
                    <button
                      type="button"
                      onClick={onClickShelf}
                      className={`${buttonText} ${textStyle}`}
                    >
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderSearchSection = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColor = isDarkTheme ? 'search-dark-theme' : 'light-theme'
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const {searchInput} = this.state
        /*  console.log(searchInput) */
        return (
          <div className={`search-container ${bgColor}`}>
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchText}
              className={`search-element ${bgColor} ${textColor}`}
              placeholder="Search"
            />
            <button
              type="button"
              testid="searchButton"
              className={`search-button ${bgColor} ${textColor}`}
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className={textColor} size={16} />
            </button>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderNoBooksView = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const {searchText} = this.state
        return (
          <div className="no-books-container">
            <img
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1651941086/Asset_1_1SearchNotFoundImage_bka7pe.png"
              className="no-books"
              alt="no books"
            />
            <p className={`empty-list-message ${textColor}`}>
              Your search for {searchText} did not find any matches.
            </p>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderBooksList = () => {
    const {booksList} = this.state
    const isEmptyBooksList = booksList.length === 0
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const textColor = !isDarkTheme
            ? 'light-theme-text'
            : 'dark-theme-text'
          return (
            <>
              <ul className="books-list-container">
                {isEmptyBooksList && this.renderNoBooksView()}
                {!isEmptyBooksList &&
                  booksList.map(eachBook => {
                    const {
                      id,
                      title,
                      coverPic,
                      rating,
                      readStatus,
                      authorName,
                    } = eachBook
                    return (
                      <Link to={`/books/${id}`} className="text-links">
                        <li key={id} className="bookslist-item">
                          <img
                            src={coverPic}
                            className="book-shelf-cover-pic"
                            alt={title}
                          />
                          <div className="books-details-container">
                            <h1 className={`book-shelf-title ${textColor}`}>
                              {title}
                            </h1>
                            <p
                              className={`book-shelf-author-name ${textColor}`}
                            >
                              {authorName}
                            </p>
                            <p className={`book-shelf-rating ${textColor}`}>
                              Avg Rating{' '}
                              <BsFillStarFill size={12} className="star" />{' '}
                              {rating}
                            </p>
                            <p
                              className={`book-shelf-read-status ${textColor}`}
                            >
                              Status:{' '}
                              <span className="book-shelf-read-status-span-text">
                                {readStatus}
                              </span>
                            </p>
                          </div>
                        </li>
                      </Link>
                    )
                  })}
              </ul>
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderBooksDisplaySection = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const {bookShelfName} = this.state
        const bookShelf = bookshelvesList.filter(
          eachShelf => eachShelf.labelValue === bookShelfName,
        )
        /* console.log(bookShelf) */

        const shelfName = bookShelf[0].label

        return (
          <div className="books-display-container">
            <div className="heading-search-container">
              {/* The All Books heading changed to {shelf name} Books.
             Here the shelf name refers to the clicked bookshelf label from the provided bookshelvesList */}
              <h1
                className={`all-books-heading ${textColor}`}
              >{`${shelfName} Books`}</h1>

              <div className="desktop-view-search-section">
                {this.renderSearchSection()}
              </div>
            </div>
            {this.renderBooksList()}
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderBookShelvesSection = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColor = isDarkTheme ? 'dark-theme' : 'light-theme'
        return (
          <div>
            <div className={`book-shelves-responsive-container ${bgColor}`}>
              {this.renderBookShelvesListSection()}
              {this.renderBooksDisplaySection()}
            </div>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )
  /* If the HTTP GET request made is unsuccessful, then the failure view should be displayed */

  renderFailureView = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        const bgColor = isDarkTheme ? 'dark-theme' : 'light-theme'
        return (
          <div className={`${bgColor} book-shelves-failure-view-container`}>
            <img
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940772/Group_7522Failure_Image_ykvhlm.png"
              className="failure-image"
              alt="failure view"
            />
            <p className={`failure-heading ${textColor}`}>
              Something went wrong, Please try again.
            </p>
            <div>
              {/* When the Try Again button is clicked,
             an HTTP GET request should be made to Books API URL */}
              <button
                type="button"
                onClick={this.onClickTryAgain}
                className="try-again-button"
              >
                Try Again
              </button>
            </div>
            <Footer />
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksListDisplayBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookShelvesSection()
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
            <div className={`book-shelves-container ${bgColor}`}>
              <Header />
              <div className="mobile-view-search-section">
                {this.renderSearchSection()}
              </div>
              {this.renderBooksListDisplayBasedOnApiStatus()}
              <Footer />
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default Bookshelves
