import axios from 'axios';

let getData = (url) =>
{
    return axios.get(url);
}

export default {getData};