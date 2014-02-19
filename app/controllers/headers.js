'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Header = mongoose.model('Header'),
    _ = require('lodash');


/**
 * Find header by id
 */
exports.header = function(req, res, next, id) {
    Header.load(id, function(err, header) {
        if (err) return next(err);
        if (!header) return next(new Error('Failed to load header ' + id));
        req.header = header;
        next();
    });
};

/**
 * Create an header
 */
exports.create = function(req, res) {
    var header = new Header(req.body);
    header.user = req.user;

    header.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                header: header
            });
        } else {
            res.jsonp(header);
        }
    });
};

/**
 * Update an header
 */
exports.update = function(req, res) {
    var header = req.header;

    header = _.extend(header, req.body);

    header.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                header: header
            });
        } else {
            res.jsonp(header);
        }
    });
};

/**
 * Delete an header
 */
exports.destroy = function(req, res) {
    var header = req.header;

    header.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                header: header
            });
        } else {
            res.jsonp(header);
        }
    });
};

/**
 * Show an header
 */
exports.show = function(req, res) {
    res.jsonp(req.header);
};

/**
 * List of Headers
 */
exports.all = function(req, res) {
    Header.find().sort('-title').populate('steps', 'seq title').exec(function(err, headers) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(headers);
        }
    });
};
