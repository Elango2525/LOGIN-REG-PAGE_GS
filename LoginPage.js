import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      // Perform login logic
      console.log('Login successful');
      setEmail('');
      setPassword('');
      history.push('/product-catalog');
    } else {
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const validateForm = () => {
    const errors = [];

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordPattern)) {
      errors.push(
        'Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol (!@#$%^&*)'
      );
    }

    return errors;
  };

  const handleSocialSignup = (provider) => {
    if (provider === 'Google') {
      window.location.href = 'https://accounts.google.com/signup';
    } else if (provider === 'Facebook') {
      window.location.href = 'https://www.facebook.com/r.php';
    } else if (provider === 'Apple') {
      window.location.href = 'https://appleid.apple.com/account#!&page=create';
    }
  };

  return (
    <div className="logins-container">
      <div className="logo">
        <img src="https://tse3.mm.bing.net/th?id=OIP.h-GFVVmViolj45ncro8SfQHaHc&pid=Api&P=0&h=180" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <i
              className={`password-toggle fas ${
                showPassword ? 'fa-eye-slash' : 'fa-eye'
              }`}
              onClick={handleTogglePasswordVisibility}
            ></i>
          </div>
        </div>
        <div className="social-buttons">
          <button className="submit">Login</button>
          <b>OR</b>
          <br />
          <button
            className="google-button"
            onClick={() => handleSocialSignup('Google')}
          >
            Login with Google
          </button>
          <button
            className="facebook-button"
            onClick={() => handleSocialSignup('Facebook')}
          >
            Login with Facebook
          </button>
          <button
            className="apple-button"
            onClick={() => handleSocialSignup('Apple')}
          >
            Login with Apple
          </button>
        </div>
        <p className="forgot-password">
          <a href="#">Forgot password?</a>
        </p>
        <div className="signup-link">
          Don't have an account?
          <a className="blink">
            <Link to="/signup"> Sign up</Link>
          </a>
        </div>
      </form>
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Error</h3>
            <ul>
              {validateForm().map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button className="error-popup-close" onClick={handleCloseErrorPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
