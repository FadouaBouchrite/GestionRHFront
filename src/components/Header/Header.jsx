import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import './Header.css';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import $ from 'jquery';

function Header(props) {
  const { user, logout } = useAuthContext();

  useEffect(() => {
    // Navbar toggle
    $('#nav-toggle').click(function() {
      $(this).toggleClass('is-active');
      $('ul.nav').toggleClass('show');
    });
  }, []);

  return (
    <> <nav className="custom-navbar" data-spy="affix" data-offset-top="20">
      <div className="container">
        {user ? (
          <ul className="nav">
            {user.user_type ==='1'? (
              <>
                <li className="item">
                  <Link to="/showEmp" className="link">Visualiser les employés</Link>
                </li>
                <li className="item">
                  <Link to="/assiduites" className="link">Visualiser les assiduités</Link>
                </li>
                <li className="item">
                  <Link to="/conges" className="link">Gérer les demandes de congés</Link>
                </li>
                <li className="item">
                  <Link to="/salaires" className="link">Gérer les Salaires</Link>
                </li>
                <li className="item">
                  <Link to="/" className="link" onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="item">
                  <Link to="/" className="link" onClick={logout}>Logout</Link>
                </li>
                <li className="item">
                  <Link to="/pointeAssiduite" className="link">Pointer l'assiduité d'aujourd'hui</Link>
                </li>
                <li className="item">
                  <Link to="/dmdconges" className="link">Demande congés</Link>
                </li>
                <li className="item">
                  <Link to="/notifications" className="link">
                    <div id='b'>
                      <button type='button' className='icon-button'>
                        <span className='material-icons'>notifications</span>
                        <span className='icon-button__badge'>{props.unreade}</span>
                      </button>
                    </div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        ) : (
          <ul className="nav">
            <li className="item">
              <Link to="/" className="link">Home</Link>
            </li>
            <li className="item">
              <Link to="/contact" className="link">Contact</Link>
            </li>
            <li className="item">
              <Link to="/login" className="link">Login</Link>
            </li>
          </ul>
        )}
        <a href="javascript:void(0)" id="nav-toggle" className="hamburger hamburger--elastic">
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </a>
      </div>
    </nav>
   
    <br /><br /><br />
    </>
  );
}

export default Header;
