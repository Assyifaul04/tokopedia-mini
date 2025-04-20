import axios from 'axios';

// Function to get CSRF token from the cookie
export const getCsrfToken = async () => {
  try {
    // Make a GET request to the /sanctum/csrf-cookie route to get the CSRF token
    await axios.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error getting CSRF token:', error);
  }
};

// Configure axios to use the CSRF token from the cookies
axios.defaults.withCredentials = true; // This is important for Sanctum

export default axios;

