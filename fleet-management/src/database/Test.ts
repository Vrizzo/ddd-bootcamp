const Store = require('openrecord/store/postgres')

const store = new Store({
    user: 'fleetops_user',
    host: 'localhost',
    database: '',
    password: 'S3cret',
    port: 5432,
})