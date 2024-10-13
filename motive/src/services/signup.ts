import axiosInstance from "../libs/interceptor";
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for redirection
import { toast } from "react-toastify";

const RegisterUser = () => {
  const navigate = useNavigate();

  // Function to send email and password for registration
  const sendRegistrationData = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(
        '/api/register', // URL endpoint for registration
        JSON.stringify({ email, password }), // Data being sent as JSON
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the content-type is JSON
          },
        }
      );

      console.log(response.data);
      const res = response.data;

      if (res.session && res.session.access_token) {
        // Store the token (in localStorage, sessionStorage, etc., depending on your needs)
        localStorage.setItem('authToken', res.session.access_token);

        // Redirect the user to the desired page after registration
        navigate('/'); // Redirect to a welcome page or any other page
        toast.success("Signup successful");

      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Handle the error (display notification, etc.)
    }
  };

  return { sendRegistrationData,  }; // Return the function for component use
};

export default RegisterUser;
