import fetch from  'isomorphic-fetch';


const BASE_API_URL = "https://goplantitbackend.herokuapp.com/api/"

export function api(api_end_point, data) {

    // console.log(JSON.stringify(data));

    return fetch(BASE_API_URL+api_end_point, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            return response.json();
        }).catch((err) => {
            // console.log(response);
            console.log(err);
        });
}