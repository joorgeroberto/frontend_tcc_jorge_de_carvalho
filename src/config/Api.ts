import { create } from 'apisauce';

const BASE_URL = 'http://162.243.169.133';

const Api = create({
  baseURL: `${BASE_URL}`,
  timeout: 20000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

export default Api;
