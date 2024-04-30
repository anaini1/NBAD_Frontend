import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModifyCategory() {
  const location = useLocation();
  const { rowData } = location.state;

  const [title, setCategoryName] = useState(rowData.title);
  const [budget, setBudget] = useState(rowData.budget);
  const [color, setColor] = useState(rowData.color);
  const [expense, setExpense] = useState(rowData.expense);
  const [month, setMonth] = useState(rowData.month);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('jwt');

  function decodingJWT(token) {
    try {
      const base64payload = (token.split('.')[1]).replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      return {};
    }
  }

  useEffect(() => {
    const existingToken = localStorage.getItem('jwt');
    if (existingToken) {
      const decodedToken = decodingJWT(existingToken);
      const issuedAt = decodedToken.iat;
      const expiresIn = decodedToken.exp - issuedAt;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
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
    navigate('/dashboard'); // Update the route to your dashboard route
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post(' https://plankton-app-f6ufz.ondigitalocean.app/addbudget',
      {
        title,
        budget,
        color,
        expense,
        username,
        month
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
            <p className="form-title">Modify Category</p>
            <div className="input-box">
              <label htmlFor="title">Category Name:</label>
        <input type="text" id="title" value={title} onChange={(e) => setCategoryName(e.target.value)} />
        
            </div>
            <div className="input-box">
              <label htmlFor="month">Month:</label>
        <input type="text" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        
            </div>
            <div className="input-box">
              <label htmlFor="budget">Total Budget:</label>
        <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        
            </div>
            <div className="input-box">
              <label htmlFor="expense">Total Expense:</label>
        <input type="text" id="expense" value={expense} onChange={(e) => setExpense(e.target.value)} />
        
            </div>
            <div className="input-box">
              <label htmlFor="color">Color:</label>
        <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
        
            </div>
            <button id="add" type="submit" className="login-form-button">
              Modify
            </button>
          </form>
        </div>
  
        {/* Popup */}
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <p>Data has been modified successfully!</p>
            </div>
          </div>
        )}
      </div>
    );
  }
export default ModifyCategory;
