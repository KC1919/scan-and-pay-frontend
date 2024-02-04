// RegisterForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Add your registration logic here
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value;

    const emailElement = document.getElementById('email') as HTMLInputElement;
    const email = emailElement.value;

    const passwordElement = document.getElementById('password') as HTMLInputElement;
    const password = passwordElement.value;

    e.target.reset();

    const userData = {
      name,
      email,
      password
    };

    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
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
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    required
                  />
                </div>
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// KC
