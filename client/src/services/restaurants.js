import axios from 'axios';

const URL = 'http://localhost:4567';

const api = axios.create({
  baseURL: `${URL}/restaurants`
});

export const fetchRestaurants = async () => {
  // console.log(URL)
  try{
    const resp = await api.get('/')
    console.log(resp)
    return resp.data.restaurants;
  } catch (e) {
    console.log(e)
  }
}

export const getRestaurant = async (id) => {
  try{
    const resp = await api.get(`/${id}`)
    console.log(resp)
    return resp.data.restaurant;
  } catch (e) {
    console.log(e)
  }
}

export const createRestaurant = async (data) => {
  try{
    const resp = await api.post('/', data);
    console.log(resp)
    return resp.data.restaurant;
  } catch (e) {
    console.log(e)
  }
}

export const updateRestaurant = async (data, id) => {
  const resp = await api.put(`/${id}`, data);
  return resp.data.restaurant;
}

export const deleteRestaurant = async (data, id) => {
  try{
    const resp = await api.delete(`/${id}`, data);
    console.log(resp)
    return resp.data.restaurant;
  } catch (e) {
    console.log(e)
  }
}
