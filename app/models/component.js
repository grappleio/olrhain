'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Component Schema
 */
var ComponentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    branches: [{
        type: Schema.ObjectId,
        ref: 'Branch'
    }]
});

/**
 * Validations
 */
ComponentSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
ComponentSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('branches', 'title _id').exec(cb);
};

mongoose.model('Component', ComponentSchema);
