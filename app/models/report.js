'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Report Schema
 */
var ReportSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    steps:[{
        type: Schema.ObjectId,
        ref : 'Step'
    }],
    branchs:[{
        type: Schema.ObjectId,
        ref : 'Branch'
    }],
    components:[{
        type: Schema.ObjectId,
        ref : 'Component'
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ReportSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ReportSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username')
    .populate('branchs', 'title component')
    .populate('components', 'title')
    .populate('steps', 'seq title')
    .exec(cb);
};

mongoose.model('Report', ReportSchema);
