import axios from 'axios';

export const getCsrfToken = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error getting CSRF token:', error);
  }
};
axios.defaults.withCredentials = true;

export default axios;

