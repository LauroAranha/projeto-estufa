import axios from 'axios';

const SERVER_URL = 'https://temperature-monitor-gamma.vercel.app/';

const db = {
  getDashboardData: async () => {
    return axios
      .get(SERVER_URL + 'dashboard')
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // sempre será executado
      });
  },
};

export default db;
