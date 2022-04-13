import { create } from 'apisauce';

export const API_BASE_URL = __DEV__ ? 'http://localhost:3333' : 'http://162.243.169.133';

const Api = create({
  baseURL: `${API_BASE_URL}`,
  timeout: 20000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

export default Api;
