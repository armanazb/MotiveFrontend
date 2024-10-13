import { useState, useEffect } from "react";
import { Mail, User, CreditCard, Trash2, Sun, Moon } from "lucide-react";
import Navbar from "../components/navbar";
import axiosInstance from "../libs/interceptor";
import { toast } from "react-toastify";

export default function ProfilePage() {
  // Set default theme to dark
  const [theme, setTheme] = useState("dark");
  const [email, setEmail] = useState("user@example.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply the theme to the HTML root and save it to localStorage
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between light and dark themes
    setTheme(theme === "light" ? "dark" : "light");
  };

  async function saveProfileChanges() {
    try {
      const userId = localStorage.getItem("user_id");

      const response = await axiosInstance.post(
        "/api/profile/update",
        JSON.stringify({ firstName, lastName, userId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { email, firstName, lastName });
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
  };

  const logout = () => {
    console.log("Logout requested");
    axiosInstance.post("/api/logout").then(() => {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    });
  };

  const handleManageSubscription = () => {
    console.log("Manage subscription requested");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Your Profile</h1>
        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div className="card-body">
            <form onSubmit={handleSave}>
              {/* <div className="form-control mt-4">
                <label className="label" htmlFor="firstName">
                  <span className="label-text">First Name</span>
                </label>
                <div className="flex items-center input-group">
                  <span className="p-2 bg-base-300 rounded-l">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Your first name"
                    className="input input-bordered w-full rounded-l-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div> */}

              {/* <div className="form-control mt-4">
                <label className="label" htmlFor="lastName">
                  <span className="label-text">Last Name</span>
                </label>
                <div className="flex items-center input-group">
                  <span className="p-2 bg-base-300 rounded-l">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Your last name"
                    className="input input-bordered w-full rounded-l-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div> */}

              {/* Slide Switch for Theme Toggle */}
              <div className="flex justify-end items-center mt-6">
                <span className="mr-2 text-sm">Toggle Theme:</span>
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === "light"}
                  />
                  {/* Sun icon for light mode */}
                  <Sun className="swap-on w-6 h-6" />
                  {/* Moon icon for dark mode */}
                  <Moon className="swap-off w-6 h-6" />
                </label>
              </div>

              <div className="form-control mt-6">
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={saveProfileChanges}
                >
                  Save Changes
                </button> */}
              </div>
            </form>

            <div className="divider my-8">Account Actions</div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                className="btn btn-outline btn-info flex items-center flex-1"
                onClick={handleManageSubscription}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Manage Subscription
              </button>
              <button
                className="btn btn-outline btn-error flex items-center flex-1"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account
              </button>
              <button
                className="btn btn-outline btn-error flex items-center flex-1"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
