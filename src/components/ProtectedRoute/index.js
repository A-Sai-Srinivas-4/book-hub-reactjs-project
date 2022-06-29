import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/login" />
    /* When an unauthenticated user tries to access the Home, Bookshelves and Book Details Route,
     then the page should be navigated to the Login Route */
  }

  return <Route {...props} />
  /* When an authenticated user tries to access the Home, Bookshelves and Book Details Route,
   then the page should be navigated to the respective route */
}

export default ProtectedRoute
