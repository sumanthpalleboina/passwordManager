import './index.css'

const PasswordCard = props => {
  const {passwordCard, receiveDelId} = props
  const {id, website, isMasked, username, password} = passwordCard
  const generatePassword = isMasked ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  ) : (
    <p className="password">{password}</p>
  )
  const sendDelId = () => {
    receiveDelId(id)
  }
  const firstLetter = website[0].toUpperCase()
  return (
    <li className="password-card-bg">
      <div className="password-card">
        <div className="profile-siteName-userName-pass">
          <div className="profile-container">
            <h1 className="profile-letter">{firstLetter}</h1>
          </div>
          <div className="Names-and-pass-container">
            <p className="name">{website}</p>
            <p className="name">{username}</p>
            {generatePassword}
          </div>
        </div>
        <button
          type="button"
          className="delete-btn"
          testid="delete"
          onClick={sendDelId}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordCard
