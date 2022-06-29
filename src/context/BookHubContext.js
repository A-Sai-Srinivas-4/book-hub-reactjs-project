import React from 'react'

const BookHubContext = React.createContext({
  isDarkTheme: false,
  onClickThemeIcon: () => {},
})

export default BookHubContext
