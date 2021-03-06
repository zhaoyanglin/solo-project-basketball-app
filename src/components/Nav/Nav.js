import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/googleMapPage" id='logo'>
    <h1>Welcome To NBO</h1>
    </Link>
    <nav className="tabs">
      <div className="selector"></div>
      {/* {props.user.id === 1 && <Link  to="/home"> */}
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'googleMapPage' : 'Login / Register'}
      </Link>} */}
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link  to="/googleMapPage">
            Google Map
          </Link>
          
          {props.user.id === 1 && <Link  to="/admin">
            Admin
          </Link>}
          <LogOutButton />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      {/* <Link  to="/about">
        About
      </Link> */}
    </nav>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
