import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import BookItem from '../BookItem'

const BooksSlider = props => {
  const settings = {
    dots: false,
    slidesToScroll: 2,
    slidesToShow: 3,
  }
  const {booksList, textColor} = props

  return (
    <>
      <Slider {...settings}>
        {booksList.map(eachBook => (
          <BookItem
            key={eachBook.id}
            bookDetails={eachBook}
            textColor={textColor}
          />
        ))}
      </Slider>
    </>
  )
}

export default BooksSlider
