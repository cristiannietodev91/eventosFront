import axios from "axios";

console.log('Backservcies URl :::>',process.env.VUE_APP_URLBACKSERVICES) // eslint-disable-line no-console

export default axios.create({
  baseURL: process.env.VUE_APP_URLBACKSERVICES,
  headers: {
    "Content-type": "application/json"
  }
});
