import axios from 'axios/index';

let getData = (url) =>
{
    return axios.get(url);
}

export default {getData};