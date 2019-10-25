import axios from 'axios';

const apiClient = axios.create({
	baseURL: `http://localhost:3000/api`,
	withCredentials: false, // This is the default
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export default {
	getCars(page, pageSize, color, model) {
		if (!color && !model) {
			return apiClient.get('/cars?page=' + page + '&pageSize=' + pageSize);
		} else if (color && model) {
			return apiClient.get(
				'/cars?page=' + page + '&pageSize=' + pageSize + '&color=' + color + '&model=' + model
			);
		} else if (color) {
			return apiClient.get('/cars?page=' + page + '&pageSize=' + pageSize + '&color=' + color);
		} else if (model) {
			return apiClient.get('/cars?page=' + page + '&pageSize=' + pageSize + '&model=' + model);
		}
	},
	getCar(id) {
		return apiClient.get('/cars/' + id);
	},
	postCar(car) {
		return apiClient.post('/cars', car);
	},
	putCar(car) {
		return apiClient.put(`/cars/${encodeURIComponent(car.id)}`, car);
	},
	deleteCar(car) {
		return apiClient.delete(`/cars/${encodeURIComponent(car.id)}`, car);
	},
	getColors() {
		return apiClient.get('/colors');
	},
	getModels() {
		return apiClient.get('/models');
	}
};
