'use strict';

// Articles routes use branchs controller
var branchs = require('../controllers/branchs');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.branch.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/branchs', branchs.all);
    app.post('/branchs', authorization.requiresLogin, branchs.create);
    app.get('/branchs/:branchId', branchs.show);
    app.put('/branchs/:branchId', authorization.requiresLogin, hasAuthorization, branchs.update);
    app.del('/branchs/:branchId', authorization.requiresLogin, hasAuthorization, branchs.destroy);

    // Finish with setting up the branchId param
    app.param('branchId', branchs.branch);

};