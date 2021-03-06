'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Branch Schema
 */
var BranchSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    hash: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
BranchSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
BranchSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('reports', 'created complete user').exec(cb);
};

mongoose.model('Branch', BranchSchema);
