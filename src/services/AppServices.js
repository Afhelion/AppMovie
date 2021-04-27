import axios from 'axios';

const baseURL = 'http://161.35.140.236:9005';

const postAuthentication = data => {
  let resp;
  let a;
  try {
    axios
      .post(`${baseURL}/api/auth/login`, data)
      .then(response => {
        if (response.status === 201) {
          console.log('entra a if');
          resp = response.data;
          a = resp;
        } else {
          console.log('i', response.status);
        }
        console.log('cc >>>', resp);
        return resp;
      })
      .catch(error => {
        console.error('b >>>', error);
        return error;
      });
  } catch (error) {
    console.log(error);
  }
  return a;
};

export {postAuthentication};
