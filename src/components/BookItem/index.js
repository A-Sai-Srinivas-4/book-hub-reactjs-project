import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {bookDetails, textColor} = props
  const {coverPic, authorName, id, title} = bookDetails
  return (
    <li key={id} className="slick-item">
      <Link to={`/books/${id}`} className="text-links">
        <img src={coverPic} className="slick-item-cover-pic" alt="title" />
        <h1 className={`slick-item-title ${textColor}`}>{title}</h1>
        <p className={`slick-item-author-name ${textColor}`}>{authorName}</p>
      </Link>
    </li>
  )
}
export default BookItem
