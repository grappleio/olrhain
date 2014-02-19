'use strict';

// Articles routes use headers controller
var headers = require('../controllers/headers');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.header.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/headers', headers.all);
    app.post('/headers', authorization.requiresLogin, headers.create);
    app.get('/headers/:headerId', headers.show);
    app.put('/headers/:headerId', authorization.requiresLogin, hasAuthorization, headers.update);
    app.del('/headers/:headerId', authorization.requiresLogin, hasAuthorization, headers.destroy);

    // Finish with setting up the headerId param
    app.param('headerId', headers.header);

};