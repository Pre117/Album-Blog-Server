// index.js
const sequelize = require('./config/sequelize');

sequelize.import('./models/blog');
sequelize.import('./models/user');

sequelize.sync({
    force: true
}).catch((err) => console.error(err)).finally(() => sequelize.close());