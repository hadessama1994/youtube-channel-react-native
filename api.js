 import axios from 'react-native-axios';

    const api = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      
    });
    
    export default api;

