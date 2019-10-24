import CarService from '../../services/CarService'

export const namespaced = true

export const state = {
    cars: [],
    carsTotal: 0,
    car: {},
    page: 0,
    pageSize: 5

}

export const mutations = {
    ADD_CAR(state, car) {
        state.cars.push(car)
    },
    SET_CARS(state, cars) {
        state.cars= cars;
    },
    SET_CARS_TOTAL(state, carsTotal) {
        state.carsTotal = carsTotal
    },
    SET_CAR(state, car) {
        state.car = car
    },
    SET_PAGE(state, page) {
        state.page = page
    }

}

export const actions = {
    addCar({commit, dispatch}, car) {
        return CarService.postCar(car)
            .then((response) => {
                commit('ADD_CAR', car)
                const notification = {
                    type: 'positive',
                    message: 'Your car has been added!'
                }
                dispatch('notification/add', notification, { root: true})
                 return response.data.id;
            })
            .catch(error => {
                const notification = {
                    type: 'negative',
                    message: 'There was a problem adding the car ' + error.message
                }
                dispatch('notification/add', notification, { root: true})
            })
    },
    deleteCar({ dispatch, state }, car) {
        return CarService.deleteCar(car)
            .then(() => {
                dispatch('fetchCars', {
                    page: state.page,
                    pageSize:  state.pageSize
                  })
                const notification = {
                    type: 'positive',
                    message: 'The car has been removed!'
                }
                dispatch('notification/add', notification, { root: true })
            })
            .catch(error => {
                const notification = {
                    type: 'negative',
                    message: 'There was a problem removing the car ' + error.message
                }
                dispatch('notification/add', notification, { root: true})
            })
    },
    editCar({commit, dispatch}, car) {
        return CarService.putCar(car)
            .then(() => {
                commit('SET_CAR', car)
                const notification = {
                    type: 'positive',
                    message: 'Your car has been edited!'
                }
                dispatch('notification/add', notification, { root: true})
                return true;
            })
            .catch(error => {
                const notification = {
                    type: 'negative',
                    message: 'Tbere was a problem editing the car ' + error.message
                }
                dispatch('notification/add', notification, { root: true})
            })
    },
    fetchCars({ commit, dispatch }, {page, pageSize}) {
        CarService.getCars(page, pageSize)
            .then(response => {
                commit('SET_CARS_TOTAL', parseInt(response.data.total))
                commit('SET_CARS', response.data.content)
            })
            .catch(error => {
                const notification = {
                    type: 'negative',
                    message: 'There was a problem fetching cars: ' + error.message
                }
                dispatch('notification/add', notification, {root: true})
            })
    },
    fetchCar({commit, getters, dispatch}, id) {
        var car = getters.getCarById(id)

        if(car){
            commit('SET_CAR', car)
        } else {
            return CarService.getCar(id)
                .then(response => {
                    commit('SET_CAR', response.data)
                    return response.data;
                })
                .catch(error => {
                    const notification = {
                        type: 'negative',
                        message: 'There was a problem fetching car: ' + error.message
                    }
                    dispatch('notification/add', notification, {root: true})
                })
        }
    }
}

export const getters = {
    getCarById: state => id => {
        return state.cars.find(car => car.id === id)
    }
}