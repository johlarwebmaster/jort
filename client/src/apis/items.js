import axios from 'axios';

export default axios.create({
    baseURL: 'https://junk-or-treasure-304219-default-rtdb.firebaseio.com/'
});