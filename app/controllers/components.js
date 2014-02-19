'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Component = mongoose.model('Component'),
    _ = require('lodash');


/**
 * Find component by id
 */
exports.component = function(req, res, next, id) {
    Component.load(id, function(err, component) {
        if (err) return next(err);
        if (!component) return next(new Error('Failed to load component ' + id));
        req.component = component;
        next();
    });
};

/**
 * Create an component
 */
exports.create = function(req, res) {
    var component = new Component(req.body);
    component.user = req.user;

    component.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                component: component
            });
        } else {
            res.jsonp(component);
        }
    });
};

/**
 * Update an component
 */
exports.update = function(req, res) {
    var component = req.component;

    component = _.extend(component, req.body);

    component.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                component: component
            });
        } else {
            res.jsonp(component);
        }
    });
};

/**
 * Delete an component
 */
exports.destroy = function(req, res) {
    var component = req.component;

    component.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                component: component
            });
        } else {
            res.jsonp(component);
        }
    });
};

/**
 * Show an component
 */
exports.show = function(req, res) {
    res.jsonp(req.component);
};

/**
 * List of Components
 */
exports.all = function(req, res) {
    Component.find().sort('-created').populate('user', 'name username').exec(function(err, components) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(components);
        }
    });
};
