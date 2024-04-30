import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
function Home({ setAuthenticated } ) {

  return (
  <div> <Header></Header>
    <div className="content">
        <div className="home-box">
        <div className="home-container">
        <article>
        <h1> Budget Tracking Application</h1>
    <h3>Sign In to your Dashboard to track expenses</h3>
    </article>
      <div className="menu">
        <div className='login-menu'>
        <article>
          <h2>Have Account?</h2>
          <nav role="navigation" aria-label="Navigation Tab">
            <Link itemProp="url" to="/login">
              <button className='menu-btn'>Sign In</button>
            </Link>
          </nav>
</article>
        </div>
        <div className='login-menu'>
        <article>
          <h2>No Account?</h2>
          <nav role="navigation" aria-label="Navigation Tab">
            <Link itemProp="url" to="/signup">
              <button className='menu-btn'>Signup</button>
            </Link>
          </nav>
          </article>
        </div> 
        <div>
            </div> 
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Home;