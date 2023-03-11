import React, { useState } from 'react'
import classes from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { registerUser, signUpProvider } from '../../firebase'

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState(null)

  const submitHandler = async () => {
    // Register Form - Missing Information (name, email or password)
    if ( !name || !email || !password ) {
      setError("Invalid Entry!") 
      return;
    }

    // Sign the User In
    const message = await registerUser( email, password, name);

    // Firebase Error
    if (message) {
      setError(message)
      navigate('/register')
      return;
    }

    // Succesful Entry
    setError(null)
    navigate('/login')
  }

  // Entry with Google Account
  const providerHandler = async () => {
    signUpProvider();
    navigate('/')
  }

  return (
    <div className={`${classes.Register} page`}>
      <div className={classes.RegisterForm}>
        <h1>Register</h1>

        {/* // ERROR MESSAGE */}
        {error && <p className='text-danger text-center m-3'>{ error }</p>}

        <form>
          <div className='mb-3'>
        
            {/* // USER-NAME */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-light">User Name</label>
              <input 
                type="text" className="form-control" placeholder="Enter Your User Name" 
                id="name" value={name} onChange={(e) => setName(e.target.value)} 
              />
            </div>

            {/* // E-MAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">E-Mail</label>
              <input 
                type="email" className="form-control" placeholder="Enter Your E-mail" 
                id="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            {/* // PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">Password</label>
              <input type="password" className="form-control" placeholder="Enter Your Password" 
                id="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {/* // SIGN UP */}
            <div className='d-grid'>
              <button type='button' className='btn btn-primary form-control mt-3' onClick={submitHandler} >Sign Up</button>
            </div>
          </div>

        </form>

        {/* // GOOGLE ACCOUNT */}
        <button type='button' className='btn btn-primary form-control mt-3' onClick={providerHandler} >Continue with Google</button>

        {/* // LOGIN */}
        <p className='text-center text-light mt-3'>Do you already have an account? 
          <span className='text-warning' style={{cursor: 'pointer'}} onClick={() => navigate('/login')}> Login</span>
        </p>
        
      </div>
    </div>
  )
}

export default Register