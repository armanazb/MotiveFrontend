import React, { useState } from 'react';
import Navbar from "../components/navbar";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Sign-up attempt with:', { username, email, password });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6">Sign Up</h2>

            {/* Username Field */}
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>

            <div className="text-center mt-4">
              <p>Already have an account? <a href="/login" className="text-blue-500">Login here</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
