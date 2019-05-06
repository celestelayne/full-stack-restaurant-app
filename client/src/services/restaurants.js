import axios from 'axios';

const URL = 'http://localhost:4567';

const api = axios.create({
  baseURL: `${URL}/restaurants`
});

async function fetchRestaurants() {
  // console.log(URL)
  try{
    const resp = await api()
    console.log(resp)
    return resp.data;
  } catch (e) {
    console.log(e)
  }
}

export default fetchRestaurants
