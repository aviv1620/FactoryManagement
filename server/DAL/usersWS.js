const axios = require('axios');

const getAllUsers = (params = {}) => {
  return axios.get(process.env.WEB_SERVICE_USERS_URL,{params});
};

module.exports = { getAllUsers };
