import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordCard from '../PasswordCard'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onChangeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  generateWebInput = () => {
    const {website} = this.state
    return (
      <div className="input-container">
        <div className="icon-hr-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="input-icon"
          />
          <hr className="hr-line" />
        </div>
        <input
          type="text"
          className="input"
          value={website}
          onChange={this.onChangeWebsiteName}
          placeholder="Enter Website"
        />
      </div>
    )
  }

  onChangeUsernameName = event => {
    this.setState({username: event.target.value})
  }

  generateUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <div className="icon-hr-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="input-icon"
          />
          <hr className="hr-line" />
        </div>
        <input
          type="text"
          className="input"
          value={username}
          onChange={this.onChangeUsernameName}
          placeholder="Enter Username"
        />
      </div>
    )
  }

  onChangePasswordName = event => {
    this.setState({password: event.target.value})
  }

  generatePasswordInput = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <div className="icon-hr-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="input-icon"
          />
          <hr className="hr-line" />
        </div>
        <input
          type="password"
          className="input"
          value={password}
          onChange={this.onChangePasswordName}
          placeholder="Enter Password"
        />
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  generateSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="input-container">
        <div className="icon-hr-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
            className="input-icon"
          />
          <hr className="hr-line" />
        </div>
        <input
          type="search"
          className="input"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="Enter Password"
        />
      </div>
    )
  }

  onSubmitAction = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPasswordItem = {
      id: uuidv4(),
      isMasked: true,
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  noPasswordView = () => (
    <div className="No-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="No-Passwords">No Passwords</p>
    </div>
  )

  receiveDelId = id => {
    const {passwordsList} = this.state
    if (passwordsList.length > 0) {
      this.setState(PrevState => ({
        passwordsList: PrevState.passwordsList.filter(each => {
          if (each.id !== id) {
            return true
          }
          return false
        }),
      }))
    }
  }

  onClickCheckbox = event => {
    if (event.target.checked === true) {
      this.setState(prevState => ({
        passwordsList: prevState.passwordsList.map(each => {
          if (each.isMasked === true) {
            return {...each, isMasked: !each.isMasked}
          }
          return each
        }),
      }))
    }
    if (event.target.checked === false) {
      this.setState(prevState => ({
        passwordsList: prevState.passwordsList.map(each => {
          if (each.isMasked === false) {
            return {...each, isMasked: !each.isMasked}
          }
          return each
        }),
      }))
    }
  }

  render() {
    const {passwordsList, searchInput} = this.state
    const filteredData = passwordsList.filter(each =>
      each.website.includes(searchInput),
    )
    const passLength = filteredData.length
    return (
      <div className="app-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="top-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-sm-pic"
          />
          <form className="form-card" onSubmit={this.onSubmitAction}>
            <h1 className="Add-New-Password">Add New Password</h1>
            {this.generateWebInput()}
            {this.generateUsernameInput()}
            {this.generatePasswordInput()}
            <div className="btn-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-lg-pic"
          />
        </div>
        <div className="bottom-section">
          <div className="bottom-header">
            <div className="password-head-count-container">
              <h1 className="your-password">Your Passwords</h1>
              <div className="counter-container">
                <p className="count">{passLength}</p>
              </div>
            </div>
            {this.generateSearchInput()}
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <div className="checkbox-show-container">
              <input
                type="checkbox"
                id="show-password"
                className="checkbox-style"
                onClick={this.onClickCheckbox}
              />
              <div className="label-container">
                <label htmlFor="show-password" className="checkbox-label">
                  Show Passwords
                </label>
              </div>
            </div>
          </div>
          <ul className="passwordCards-container">
            {passLength > 0
              ? filteredData.map(each => (
                  <PasswordCard
                    key={each.id}
                    passwordCard={each}
                    receiveDelId={this.receiveDelId}
                  />
                ))
              : this.noPasswordView()}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
