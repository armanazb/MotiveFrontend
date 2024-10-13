
import React, { useState } from "react";
import Navbar from "../components/navbar";
import LoginUser from "../services/login";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendLoginData } = LoginUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the login function with the email and password
      await sendLoginData(email, password);
    } catch (error) {
      toast.error("Login failed");
      // Handle any errors (e.g., display a notification or alert)
      console.error("Login failed", error);
    }
  };

import React, { useState } from 'react';
import Navbar from "../components/navbar";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
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
            <div className="form-control mt-6">

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="/signup">Don't have an account?</a>

              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="text-center mt-4">
                <a href='/signup'>Don't have an account?</a> 

            </div>
          </form>
        </div>
      </div>
    </>
  );

}

}

