'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Test Schema
 */
var TestSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    desc: {
        type: String,
        default: '',
        trim: true
    },
    headers : [{
        type : Schema.ObjectId,
        ref : 'Header'
    }]
});

/**
 * Validations
 */
TestSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
TestSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('headers', 'name steps').exec(cb);
};

mongoose.model('Test', TestSchema);
