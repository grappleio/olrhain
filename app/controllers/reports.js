'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Report = mongoose.model('Report'),
    _ = require('lodash');


/**
 * Find report by id
 */
exports.report = function(req, res, next, id) {
    Report.load(id, function(err, report) {
        if (err) return next(err);
        if (!report) return next(new Error('Failed to load report ' + id));
        req.report = report;
        next();
    });
};

/**
 * Create an report
 */
exports.create = function(req, res) {
    var report = new Report(req.body);
    report.user = req.user;

    report.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                report: report
            });
        } else {
            res.jsonp(report);
        }
    });
};

/**
 * Update an report
 */
exports.update = function(req, res) {
    var report = req.report;

    report = _.extend(report, req.body);

    report.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                report: report
            });
        } else {
            res.jsonp(report);
        }
    });
};

/**
 * Delete an report
 */
exports.destroy = function(req, res) {
    var report = req.report;

    report.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                report: report
            });
        } else {
            res.jsonp(report);
        }
    });
};

/**
 * Show an report
 */
exports.show = function(req, res) {
    res.jsonp(req.report);
};

/**
 * List of Reports
 */
exports.all = function(req, res) {
    Report.find().sort('-created').populate('user', 'name username').exec(function(err, reports) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(reports);
        }
    });
};
