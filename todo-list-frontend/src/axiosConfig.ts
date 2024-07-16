import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000' // URL de votre backend NestJS
});

export default instance;
