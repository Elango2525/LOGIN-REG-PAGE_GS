import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
    
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      // Perform signup logic
      console.log('Signup successful');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setGender('');
      setMobile('');

      history.push('/product-catalog');
    } else {
      setErrors(validationErrors);
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const validateForm = () => {
    const errors = [];

    // Name validation
    if (!name.trim()) {
      errors.push('Please enter your name');
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.push('Please enter a valid email address');
    }

    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordPattern)) {
      errors.push(
        'Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol (!@#$%^&*)'
      );
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
    // Gender validation
    if (!gender) {
      errors.push('Please select your gender');
    }

    // Mobile number validation
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobile.match(mobilePattern)) {
      errors.push('Please enter a valid 10-digit mobile number');
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

  useEffect(() => {
    if (errors.length > 0) {
      setShowErrorPopup(true);
    }
  }, [errors]);

  return (
    <div className="login-container">
      <div className="logo">
        <img src="https://tse3.mm.bing.net/th?id=OIP.h-GFVVmViolj45ncro8SfQHaHc&pid=Api&P=0&h=180" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <i
              className={`password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={handleTogglePasswordVisibility}
            ></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <div className="gender-input">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input type="text" id="mobile" value={mobile} onChange={handleMobileChange} />
        </div>
        <div className="social-buttons">
          <button className="submit">Signup</button>
          <b>OR</b>
          <br />
          <button className="google-button" onClick={() => handleSocialSignup('Google')}>
            Signup with Google
          </button>
          <button className="facebook-button" onClick={() => handleSocialSignup('Facebook')}>
            Signup with Facebook
          </button>
          <button className="apple-button" onClick={() => handleSocialSignup('Apple')}>
            Signup with Apple
          </button>
        </div>
        <p className="forgot-password">
          <a href="#">Forgot password?</a>
        </p>
        <div className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Error</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button className="error-popup-close" onClick={handleCloseErrorPopup}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
