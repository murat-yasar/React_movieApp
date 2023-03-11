import React, { useState } from 'react'
import classes from './Login.module.css'  // this class is an object with a property of .Login
import { useNavigate } from 'react-router-dom'
import { login, signUpProvider, forgotPassword } from '../../firebase'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null)

  const submitHandler = async () => {
    // Error Message of entry
    if ( !email || !password ) {
      setError("Invalid Entry!") 
      return;
    }

    // Log the user in
    const message = await login( email, password);
    if (message) {
      setError(message)
      navigate('/login')
      return;
    }

    // In case of a succesful entry
    setError(null)
    navigate('/')
  }

  const providerHandler = async () => {
    signUpProvider();
    navigate('/')
  }

  const forgotPasswordHandler = async (email) => {
    const message = await forgotPassword(email);
    message && setError(message);
  }

  return (
    <div className={`${classes.Login} page`}>
      <div className={classes.LoginForm}>
        <h1>Login</h1>
        {error && <p className='text-danger text-center m-3'>{ error }</p>}
        <form>
          <div className='mb-3'>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">E-Mail</label>
              <input 
                type="email" className="form-control" placeholder="Enter Your E-mail" 
                id="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">Password</label>
              <input type="password" className="form-control" placeholder="Enter Your Password" 
                id="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              />
              <div className='text-center text-warning mt-3' style={{cursor: 'pointer'}} onClick={() => forgotPasswordHandler(email)} 
              >Did you forget your password?</div>
            </div>
            <div className='d-grid'>
              <button type='button' className='btn btn-primary form-control mt-3' onClick={submitHandler} >Login</button>
            </div>
          </div>
        </form>
        <button type='button' className='btn btn-primary form-control mt-3' onClick={providerHandler} 
        >Continue with Google</button>
        <p className='text-center text-light mt-3'>Don't you have an account yet? 
          <span className='text-warning' style={{cursor: 'pointer'}} onClick={() => navigate('/register')}> Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default Login