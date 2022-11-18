export default function ({ $axios }) {
  const url = 'http://localhost:3000/users';


  $axios.defaults.baseURL = url;
}
