import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import BookHubContext from '../../context/BookHubContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

class BooksSlider extends Component {
  renderBooksSlider = booksList => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
        return (
          /* After the data is fetched successfully, display the list of top rated books received from the response */

          <Slider {...settings}>
            {booksList.map(book => {
              const {id, authorName, coverPic, title} = book
              return (
                /* When a book item is clicked, then the page should be navigated to the Book Details Route */

                <Link className="slick-item-link" to={`/books/${id}`} key={id}>
                  <div className="slick-item">
                    <img className="book-image" src={coverPic} alt={title} />
                    <div className="heading-container">
                      <h1 className={`book-title ${textColor}`}>{title}</h1>
                      <p className={`author ${textColor}`}>{authorName}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </Slider>
        )
      }}
    </BookHubContext.Consumer>
  )

  render() {
    const {booksList} = this.props
    return (
      <div className="slick-container">{this.renderBooksSlider(booksList)}</div>
    )
  }
}

export default BooksSlider
