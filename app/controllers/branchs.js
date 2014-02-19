'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Branch = mongoose.model('Branch'),
    _ = require('lodash');


/**
 * Find branch by id
 */
exports.branch = function(req, res, next, id) {
    Branch.load(id, function(err, branch) {
        if (err) return next(err);
        if (!branch) return next(new Error('Failed to load branch ' + id));
        req.branch = branch;
        next();
    });
};

/**
 * Create an branch
 */
exports.create = function(req, res) {
    var branch = new Branch(req.body);
    branch.user = req.user;

    branch.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                branch: branch
            });
        } else {
            res.jsonp(branch);
        }
    });
};

/**
 * Update an branch
 */
exports.update = function(req, res) {
    var branch = req.branch;

    branch = _.extend(branch, req.body);

    branch.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                branch: branch
            });
        } else {
            res.jsonp(branch);
        }
    });
};

/**
 * Delete an branch
 */
exports.destroy = function(req, res) {
    var branch = req.branch;

    branch.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                branch: branch
            });
        } else {
            res.jsonp(branch);
        }
    });
};

/**
 * Show an branch
 */
exports.show = function(req, res) {
    res.jsonp(req.branch);
};

/**
 * List of Branchs
 */
exports.all = function(req, res) {
    Branch.find().sort('-created').populate('user', 'name username').exec(function(err, branchs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(branchs);
        }
    });
};
