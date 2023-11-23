import axios from 'axios';


const API_URL_NOTIFY    = "https://votacaocode.snctjp.com.br/api/";
const TOKEN_API_NOTIFY  = process.env.TOKEN_API_NOTIFY  || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5vdGlmaWNhdGlvbiB1c2VyIn0.CqzRyO-ZpnSEJQJebvFDmfFsb-dOUSGCHTPAhLTVqGRFqmG7PyU1bgLJW7LG-n1vELaHek-beaKnunWvwo47fA';



const apiNotify = axios.create({
    baseURL: API_URL_NOTIFY,
    headers:{ Authorization : `Bearer ${TOKEN_API_NOTIFY}` },   
  });


  apiNotify.interceptors.response.use(async response => {
    return response;
  }, async error => {
    if (400 === error.response.status) {
      const msg = error.response.data.error;
      console.error(`Problemas no servidor: ${msg}`)
    } else if (401 === error.response.status) {
      console.warning('Sessão Inválida');
    } else if (403 === error.response.status) {
      console.warning('Você não tem permissão para acessar esse recurso');
    } else if (500 === error.response.status) {
      console.error('Erro interno no servidor')
    }
    return Promise.reject(error);
  }
  );

  // apiNotify.interceptors.request.use(async (config) => {
  
  //   if (config.url === '/users') {
  //     config.baseURL = API_URL_NOTIFY;
  //     config.headers.Authorization = `Bearer ${TOKEN_API_NOTIFY}`;
  //   }    
  //   return config;
  // });

  export default apiNotify;