import React, { useState, useEffect } from 'react'
import { login, createNewUser } from '../../store/thunks'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSubmit: (name: string, password: string) =>
      dispatch(login({ name, password })),
    create: (name: string, password: string) =>
      dispatch(createNewUser({ name, password }))
  }
}

const Login = ({
  handleSubmit,
  create,
  history
}: {
  handleSubmit: any
  create: any
  history: any
}) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [buttonType, setButtonType] = useState('Login')
  const [error, setError] = useState('')
  const submitUser = (ev: any) => {
    ev.preventDefault()
    // if an existing user is logging in, handleSubmit thunk is called.
    if (buttonType === 'Login') {
      handleSubmit(userName, password)
        .then(() => history.push('/'))
        .catch((e: Error) => console.log(`Failed to log in.\n${e}`))
    } else {
      // if a user is creating an account for the first time,
      // createAccount thunk is called.
      create(userName, password)
        .then(() => history.push('/'))
        .catch((e: Error) => console.log(`Failed to create new user \n${e}`))
    }
  }
  return (
    <div className="mt-5 d-flex justify-content-center">
      {error ? <div>There has been an error</div> : ''}
      <form onSubmit={submitUser} className="form-login align-self-center">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            type="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-raised btn-success btn-lg mt-5"
          >
            {buttonType}
          </button>
        </div>
        <div>
          <div className="d-flex justify-content-center mt-2">
            Don't have an account?
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setButtonType('Create')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
