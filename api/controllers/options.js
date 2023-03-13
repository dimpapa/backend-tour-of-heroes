'use strict';

const optionsController = (req, res, next) => {
    console.debug('Express [/api/] says: OPTIONS');
    // .header enables setting many headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-auth');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.status(200).json({ message: 'OPTIONS, ok' });
}

module.exports = optionsController;
