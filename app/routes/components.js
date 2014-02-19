'use strict';

// Articles routes use components controller
var components = require('../controllers/components');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.component.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/components', components.all);
    app.post('/components', authorization.requiresLogin, components.create);
    app.get('/components/:componentId', components.show);
    app.put('/components/:componentId', authorization.requiresLogin, hasAuthorization, components.update);
    app.del('/components/:componentId', authorization.requiresLogin, hasAuthorization, components.destroy);

    // Finish with setting up the componentId param
    app.param('componentId', components.component);

};