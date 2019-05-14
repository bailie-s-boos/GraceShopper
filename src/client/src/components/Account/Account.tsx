import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { User } from 'src/@types/redux-types'
import { putPassword } from '../../store/thunks'

const mapStateToProps = ({ user }: { user: User }) => ({
  user
})

const mapDispatchToProps = (dispatch: any) => ({ updatePassword: (password: string) => dispatch(putPassword(password)) })

const Account = ({ user, updatePassword, history }: { user: User; updatePassword: any; history: any }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [samePasswords, setSamePasswords] = useState(false)

  useEffect(() => {
    setSamePasswords(checkPasswords())
  }, [password, confirmPassword])
  const checkPasswords = () => {
    return password === confirmPassword
  }

  const handleSubmit = () => {
    updatePassword(password)
      .then(() => history.push('/'))
      .catch(setError)
  }

  return (
    <div className="mt-5 d-flex justify-content-center flex-column align-items-center">
      <h2>Welcome {user.name}!</h2>
      {error ? <div>There has been an error</div> : ''}
      <form onSubmit={handleSubmit} className="form-login align-self-center">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            type="text"
            value={confirmPassword}
            onChange={ev => setConfirmPassword(ev.target.value)}
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-raised btn-success btn-lg mt-5" disabled={!samePasswords}>
            Change Password
          </button>
        </div>
        <div />
      </form>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
