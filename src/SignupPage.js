import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isConfirmBoxOpen, setPopupOpen] = useState(false);
  const [popupTimer, setPopupTimer] = useState(null);
  const navigate = useNavigate();
  
  function backtoHome() {
    navigate('/'); 
  }
  function handleSubmit(event) {
    event.preventDefault();

    axios.post('https://plankton-app-f6ufz.ondigitalocean.app/signup', { email, password, username, name })
      .then(res => {
        if (res && res.data && res.data.success) {
          setPopupOpen(true);
          const timer = setTimeout(() => {
            setPopupOpen(false);
            navigate('/login');
          }, 3000);
          setPopupTimer(timer);
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    return () => {
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    };
  }, [popupTimer]);

 

  return (
    <div className="login-page">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <button className="back" onClick={backtoHome}>
        <i className='bx bxs-left-arrow-alt'></i>
        Back to HomePage
      </button>
      <div className="login-box">
        <form id="login-form" onSubmit={handleSubmit}>
          <p className="form-title">Sign Up to the Dashboard</p>
          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
           </div>
           <div className="input-box">
            <label htmlFor="signup-email">Email:</label>
            <input type="text" id="signup-email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          <div className="input-box">
            <label htmlFor="signup-password">Password:</label>
            <input type="password" id="signup-password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          <button id="signup" type="submit" className="login-form-button">Sign Up</button>
          <br/><br/>
          <div>
           <article> Already have an account?&nbsp;
            <Link itemProp="url" to="/login">Sign In</Link>
            </article></div>
        </form>
      </div>
      {isConfirmBoxOpen && (
        <div className="confirmbox">
          <div className="popup-innerbox">
            <p>Account has been created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
