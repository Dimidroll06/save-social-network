const e = require('express');
const { getUser } = require('../middleware/isAuthentificated.js');
const r = e.Router();

r.use('/auth', require('./authRoute.js'));
r.use('/messages', require('./messagesRoute.js'));

module.exports = r;