'use strict';

// Articles routes use tests controller
var tests = require('../controllers/tests');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.test.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/tests', tests.all);
    app.post('/tests', authorization.requiresLogin, tests.create);
    app.get('/tests/:testId', tests.show);
    app.put('/tests/:testId', authorization.requiresLogin, hasAuthorization, tests.update);
    app.del('/tests/:testId', authorization.requiresLogin, hasAuthorization, tests.destroy);

    // Finish with setting up the testId param
    app.param('testId', tests.test);

};