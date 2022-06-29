import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isPasswordVisible: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    /* When the valid username and password are provided and the Login button is clicked, 
    then the page should be navigated to the Home Route */
  }

  submitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          placeholder="Enter Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password, isPasswordVisible} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>

        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter Password"
        />
        {/* Here I implemented 'Show Password' Option  it helps to User to see password */}

        <div className="check-box-container">
          <input
            type="checkbox"
            id="show-password"
            checked={isPasswordVisible}
            onChange={this.onClickCheckbox}
            className="check"
          />
          <label className="input-label show-password" htmlFor="show-password">
            Show Password
          </label>
        </div>
      </>
    )
  }

  renderLoginForm = () => {
    const {showSubmitError, errorMsg} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dcci6hybb/image/upload/v1656069514/Group_7731_uau5pk.png"
            className="logo-desktop-image"
            alt="login website logo"
          />
          <img
            src="https://res.cloudinary.com/dcci6hybb/image/upload/v1656069514/Group_7731_uau5pk.png"
            className="logo-mobile-image"
            alt="login website logo"
          />
        </div>
        <div className="input-container">{this.renderUsernameField()}</div>
        <div className="input-container">{this.renderPasswordField()}</div>

        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

        {/* When the invalid username and password are provided and the Login button is clicked,
        then the respective error message received from the response should be displayed */}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dcci6hybb/image/upload/v1656069503/Rectangle_1467_1x_dvekuk.png"
          className="login-desktop-image"
          alt="website login"
        />
        <img
          src="https://res.cloudinary.com/dcci6hybb/image/upload/v1656069503/Rectangle_1467_1x_dvekuk.png"
          className="login-mobile-image"
          alt="website login"
        />

        <div className="logo-and-login-form-container">
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login
