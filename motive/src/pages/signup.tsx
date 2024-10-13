import React, { useState } from "react";
import Navbar from "../components/navbar";
import RegisterUser from "../services/signup";
import { toast } from "react-toastify";

export default function SignupPage() {
  //   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRegistrationData } = RegisterUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the login function with the email and password
      await sendRegistrationData(email, password);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      // Handle any errors (e.g., display a notification or alert)
      toast.error("Signup failed");
      console.error("Login failed", error);
    }
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
              {/* <input
                type="text"
                id="username"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              /> */}
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
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>

            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
