'use strict';

// Articles routes use steps controller
var steps = require('../controllers/steps');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.step.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/steps', steps.all);
    app.post('/steps', authorization.requiresLogin, steps.create);
    app.get('/steps/:stepId', steps.show);
    app.put('/steps/:stepId', authorization.requiresLogin, hasAuthorization, steps.update);
    app.del('/steps/:stepId', authorization.requiresLogin, hasAuthorization, steps.destroy);

    // Finish with setting up the stepId param
    app.param('stepId', steps.step);

};