import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

function LoginPage({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('https://plankton-app-f6ufz.ondigitalocean.app/login', { email, password })
      .then(res => {
        console.log(res.data);
        if (res && res.data && res.data.success) {
          const token = res.data.token;
          const username = res.data.username;
          localStorage.setItem('jwt', token);
          localStorage.setItem('username', username);
          setAuthenticated(true);
          navigate('/dashboard');
        }
      })
      .catch(err => console.error(err));
  }

  function backtoHome() {
    navigate('/');
  }

  return (
    <div className="login-page">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    <button className="back" onClick={backtoHome} aria-label="Navigate to Home">
        <i className='bx bxs-left-arrow-alt'></i>
        Navigate to Home
      </button>
      <div className="login-box">
        <form id="login-form" onSubmit={handleSubmit}>
          <p className="form-title">Sign In to the Dashboard</p>
          <div className="input-box">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              aria-label="Email"
            />&nbsp;
           </div>
          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              aria-label="Password"
            />&nbsp;
           </div>
          <button id="login" type="submit" className="login-form-button">Login</button>

          <div className='signup-link'>
            <br />
           <article>No Account?&nbsp;
            <Link itemProp="url" to="/signup">Signup</Link></article> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
