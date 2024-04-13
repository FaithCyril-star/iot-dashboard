import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
// import { setupCache, HeadersInterpreter } from 'axios-cache-interceptor/dev'; 

const instance = Axios.create(); 
const axios = setupCache(instance);

export default axios;