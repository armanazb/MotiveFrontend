import axiosInstance from "../libs/interceptor";
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for redirection
import { toast } from "react-toastify";

const LoginUser = () => {
  const navigate = useNavigate();

  // Function to send email and password for login
  const sendLoginData = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(
        '/api/login', // URL endpoint for login
        JSON.stringify({ email, password }), // Data being sent as JSON
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the content-type is JSON
          },
        }
      );

      console.log(response.data);
      const res = response.data;
      
      if ( res.access_token) {
        // Store the token (in localStorage, sessionStorage, etc., depending on your needs)
        localStorage.setItem('authToken',  res.access_token);

        // Redirect the user to the desired page after registration
        navigate('/'); // Redirect to a welcome page or any other pag
        toast.success("Login successful");

      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // You can also handle error notifications here
    }
  };

  return { sendLoginData }; // Return the function for component use
};

export default LoginUser;
