import axios from 'axios';

const SERVER_URL = 'https://temperature-monitor-gamma.vercel.app/';

const db = {
  getDashboardData: async () => {
    return axios
      .get(SERVER_URL + 'dashboard')
      .then(function (response) {
        //console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      });
  },
  getAverageData: async () => {
    return axios
      .get(SERVER_URL + 'average')
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      });
  },
};

export default db;
