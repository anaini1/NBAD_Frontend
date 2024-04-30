import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCategory() {
  const [title, setCategoryName] = useState('');
  const [budget, setBudget] = useState('');
  const [color, setColor] = useState('');
  const [expense, setExpense] = useState('');
  const [month, setMonth] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('jwt');

  function decodingJWT(token) {
    try {
      const base64payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64payload)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return {};
    }
  }

  useEffect(() => {
    console.log('LoginPage - Initial Authenticated:', localStorage.getItem('jwt'));
    const existingToken = localStorage.getItem('jwt');
    if (existingToken) {
      const decodedToken = decodingJWT(existingToken);
      const issuedAt = decodedToken.iat;
      const expiresIn = decodedToken.exp - issuedAt;
      console.log('LoginPage - expiresIn:', expiresIn);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      console.log('currentTimeInSeconds::', currentTimeInSeconds);
      const warningTime = expiresIn - 20;
      const warningTimeout = setTimeout(() => {
        const userResponse = window.confirm('Your session will expire in 20 seconds. Do you want to continue?');

        if (!userResponse || currentTimeInSeconds - issuedAt > expiresIn) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          window.location.reload();
        }
      }, warningTime * 1000);
      // Clear the warning timeout when the component unmounts
      return () => clearTimeout(warningTimeout);
    }
  }, []);

  function handleBackToDashboard() {
    navigate('/dashboard');
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(title, budget, color, expense);

    axios
      .post(
        'https://plankton-app-f6ufz.ondigitalocean.app/addbudget',
        {
          title,
          budget, 
          color,
          expense,
          username,
          month,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.success);
        if (res && res.data && res.data.success) {
          setPopupOpen(true);

          setTimeout(() => {
            setPopupOpen(false);
          }, 3000);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="login-page">
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <button className="back" onClick={handleBackToDashboard}>
        <i className="bx bxs-left-arrow-alt"></i>
        Navigate to Dashboard
      </button>
      <div className="login-box">
        <form id="login-form" onSubmit={handleSubmit}>
          <p className="form-title">Add Category</p>
          <div className="input-box">
            <label htmlFor="title">Category Name:</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Category Name:"
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
  <label htmlFor="month">Month:</label>
  <div className="custom-dropdown">
    <select 
      id="month" 
      onChange={(e) => setMonth(e.target.value)} 
      required
    >
      <option value="" >Select Month</option>
      <option value="January" >January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
    <div className="dropdown-arrow">&#9660;</div>
  </div>
</div>

          <br/>
          <div className="input-box">
            <label htmlFor="budget">Total Budget:</label>
            <input
              type="text"
              id="budget"
              placeholder="Enter Desired Budget for this Category"
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="expense">Expense:</label>
            <input
              type="text"
              id="expense"
              placeholder="Enter Desired Expense for this Category"
              onChange={(e) => setExpense(e.target.value)}
              required
            />
          </div>
         
          <div className="input-box">
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              placeholder="Enter Color as String/Hexacode"
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <button id="add" type="submit" className="login-form-button">
            Add
          </button>
        </form>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>Data has been created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
