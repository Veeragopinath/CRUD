export default function ({ $axios }) {
  debugger
  const url = 'http://localhost:3001';


  $axios.defaults.baseURL = url;
}