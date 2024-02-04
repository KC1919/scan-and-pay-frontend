// LoginForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const emailElement = document.getElementById('email') as HTMLInputElement;
    const email = emailElement.value;

    const passwordElement = document.getElementById('password') as HTMLInputElement;
    const password = passwordElement.value;

    const userData = {
      email,
      password
    };

    e.target.reset();

    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    const jsonResp = await response.json();

    console.log(jsonResp);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// KC
