'use strict';

// Articles routes use reports controller
var reports = require('../controllers/reports');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.report.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/reports', reports.all);
    app.post('/reports', authorization.requiresLogin, reports.create);
    app.get('/reports/:reportId', reports.show);
    app.put('/reports/:reportId', authorization.requiresLogin, hasAuthorization, reports.update);
    app.del('/reports/:reportId', authorization.requiresLogin, hasAuthorization, reports.destroy);

    // Finish with setting up the reportId param
    app.param('reportId', reports.report);

};