'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Header Schema
 */
var HeaderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    steps :[{
        type : Schema.ObjectId,
        ref : 'Step'
    }]
});

/**
 * Validations
 */
HeaderSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
HeaderSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('steps', 'seq name status').exec(cb);
};

mongoose.model('Header', HeaderSchema);
