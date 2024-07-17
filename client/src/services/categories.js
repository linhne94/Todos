import axios from './axios';

const getCategories = () => {
  return axios.get('/category');
};

export { getCategories };
