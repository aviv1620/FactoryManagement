const axios = require('axios');

const getAllUsers = (params = {}) => {
  return axios.get('https://jsonplaceholder.typicode.com/users',{params});
};

module.exports = { getAllUsers };
