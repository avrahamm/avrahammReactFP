// import axios from 'axios';

// export const getData = (url) =>
// {
//     return axios.get(url)
//         .then(resp => resp.data);
// }

export const getData = (url) =>
{
    return fetch(url)
        .then(resp => resp.json());
}
