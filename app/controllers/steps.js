'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Step = mongoose.model('Step'),
    _ = require('lodash');


/**
 * Find step by id
 */
exports.step = function(req, res, next, id) {
    Step.load(id, function(err, step) {
        if (err) return next(err);
        if (!step) return next(new Error('Failed to load step ' + id));
        req.step = step;
        next();
    });
};

/**
 * Create an step
 */
exports.create = function(req, res) {
    var step = new Step(req.body);
    step.user = req.user;

    step.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                step: step
            });
        } else {
            res.jsonp(step);
        }
    });
};

/**
 * Update an step
 */
exports.update = function(req, res) {
    var step = req.step;

    step = _.extend(step, req.body);

    step.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                step: step
            });
        } else {
            res.jsonp(step);
        }
    });
};

/**
 * Delete an step
 */
exports.destroy = function(req, res) {
    var step = req.step;

    step.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                step: step
            });
        } else {
            res.jsonp(step);
        }
    });
};

/**
 * Show an step
 */
exports.show = function(req, res) {
    res.jsonp(req.step);
};

/**
 * List of Steps
 */
exports.all = function(req, res) {
    Step.find().sort('-created').populate('user', 'name username').exec(function(err, steps) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(steps);
        }
    });
};
