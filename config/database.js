if(process.env.NODE_ENV == 'production') {
    let config = {
        database: 'mongodb://dameos:Ajiaco312@ds023510.mlab.com:23510/canopee'
    }
} else {
    let config = {
        database: 'mongodb://localhost:27017/canopee'
    }
}

module.exports = config;
