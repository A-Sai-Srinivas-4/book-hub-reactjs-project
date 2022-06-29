import Header from '../Header'
import Footer from '../Footer'
import BookHubContext from '../../context/BookHubContext'
import BookItem from '../BookItem'

const MyFavorites = props => {
  const onClickedAddFavorite = () => {
    const {history} = props
    history.push('/shelf')
  }

  return (
    <>
      <Header favorite />
      <BookHubContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="favorite-books-bg-container">
              <h1 className="favorite-books-heading">My Favorite Books</h1>
              {favoriteList.length === 0 ? (
                <div className="no-favorite-container">
                  <img
                    src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647251883/no-item-found-4372183-3626865_rrtmpw.png"
                    className="no-favorite-image"
                    alt="no favorite"
                  />
                  <p className="top-rated-failure-heading">No Favorite Books</p>
                  <button
                    className="failure-button"
                    onClick={onClickedAddFavorite}
                    type="button"
                  >
                    Add Favorite
                  </button>
                </div>
              ) : (
                <ul className="favorite-books-list-container">
                  {favoriteList.map(eachItem => (
                    <BookItem key={eachItem.id} bookDetails={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </BookHubContext.Consumer>
      <Footer />
    </>
  )
}

export default MyFavorites
