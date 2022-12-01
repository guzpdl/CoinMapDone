const axios = require('axios')

class Coins {
    constructor(){
        this.axios = axios.create({
            baseURL: 'https://api.coingecko.com/api/v3/'
        })
    }

    getCoinList(){
        return this.axios
        .get('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
    trending(){
        return this.axios
        .get('coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
    chart(id, days = 365){
        return this.axios
        // .get(`coins/${id}/market_chart?vs_currency=usd&days=365&interval=daily`)
        // .get(`coins/${id}/market_chart?vs_currency=usd&days=365`)
        .get(`coins/${id}/market_chart?vs_currency=usd&days=${days}`)
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
    search(name){
        return this.axios
        .get(`search?query=${name}`)
        .then(({data}) => data)
        .catch(e => console.log(e))
    }

    getData(){
        return this.axios
        .get('coins/list')
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
    top100Exchanges(){
        return this.axios
        .get('exchanges')
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
    changingDetails(id){
        return this.axios
        .get(`coins/${id}`)
        .then(({data}) => data)
        .catch(e => console.log(e))
    }
}

module.exports = new Coins()