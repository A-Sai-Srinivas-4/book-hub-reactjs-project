import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

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
  renderSlider = booksList => (
    <Slider {...settings}>
      {booksList.map(eachLogo => {
        const {id, authorName, coverPic, title} = eachLogo
        return (
          <Link className="slick-item-link" to={`/books/${id}`} key={id}>
            <div className="slick-item">
              <img className="logo-image" src={coverPic} alt={title} />
              <div className="heading-container">
                <h1 className="book-title">{title}</h1>
                <p className="author">{authorName}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </Slider>
  )

  render() {
    const {booksList} = this.props
    return <div className="slick-container">{this.renderSlider(booksList)}</div>
  }
}

export default BooksSlider
