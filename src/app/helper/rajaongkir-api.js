const axios = require('axios')

// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter'
axios.defaults.headers.common['key'] = 'abd4c42f7ac2c9c08ddc1bb8956875f6'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



exports.getCost = async (origin, destination, weight, courier) => {
    const result = await axios.post('/cost', {
        origin: 1,
        destination: 1,
        weight: 1000,
        courier: 'jne'
    })
        .then(response => { return response.data.rajaongkir.results[0].costs[0].cost[0].value })
        .catch(err => { throw err })

    return result
}
exports.getAllProvince = async () => {
    const result = await axios.get('/province')
        .then(response => { return response.data.rajaongkir.results })
        .catch(err => { throw err })

    return result
}
exports.getAllCity = async () => {
    const result = await axios.get('/city')
        .then(response => { return response.data.rajaongkir.results })
        .catch(err => { throw err })

    return result
}