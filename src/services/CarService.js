import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCars(page, pageSize) {
    return apiClient.get('/cars?page=' + page + '&pageSize=' + pageSize)
  },
  getCar(id) {
    return apiClient.get('/cars/' + id)
  },
  postCar(car) {
    return apiClient.post('/cars', car)
  },
  putCar(car) {
    return apiClient.put(`/cars/${encodeURIComponent(car.id)}`,  car)
  },
  deleteCar(car) {
    return apiClient.delete(`/cars/${encodeURIComponent(car.id)}`, car)
  }
}