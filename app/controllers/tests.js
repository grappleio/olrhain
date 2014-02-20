'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Test = mongoose.model('Test'),
    _ = require('lodash');


/**
 * Find test by id
 */
exports.test = function(req, res, next, id) {
    Test.load(id, function(err, test) {
        if (err) return next(err);
        if (!test) return next(new Error('Failed to load test ' + id));
        req.test = test;
        next();
    });
};

/**
 * Create an test
 */
exports.create = function(req, res) {
    var test = new Test(req.body);
    test.user = req.user;

    test.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                test: test
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Update an test
 */
exports.update = function(req, res) {
    var test = req.test;

    test = _.extend(test, req.body);

    test.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                test: test
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Delete an test
 */
exports.destroy = function(req, res) {
    var test = req.test;

    test.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                test: test
            });
        } else {
            res.jsonp(test);
        }
    });
};

/**
 * Show an test
 */
exports.show = function(req, res) {
    res.jsonp(req.test);
};

/**
 * List of Tests
 */
exports.all = function(req, res) {
    Test.find().sort('-created').populate('user', 'name username').populate('branch','title').populate('component','name').exec(function(err, tests) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(tests);
        }
    });
};
