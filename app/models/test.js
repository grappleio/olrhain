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
    component : { type: Schema.ObjectId, ref : 'Component'},
    branch : { type : Schema.ObjectId, ref : 'Branch'},
    headers : [{
        name : { type: String },
        status: { type: String, enum : ['Pass', 'Fail', 'NotTested'] },
        steps : [{
                    seq : { type: Number},
                    desc : { type : String },
                    status : { type: String, enum : ['Pass', 'Fail', 'NotTested']}
                }]
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }

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
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Test', TestSchema);
