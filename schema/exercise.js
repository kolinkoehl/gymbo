/**
 * Created by kolinkoehl on 9/20/16.
 */

//copied pasted for now

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var exerciseSchema = new Schema({
    name: {type: String, unique: true, required: true},
    type: {type: String, required: true},
    muscleGroup: {type: String, required: true},
    rating: {type: Number, required: true},
    description: {type: String, unique: true, required: true}
},
    {
        timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Exercise = mongoose.model('Exercise', exerciseSchema);

// make this available to our users in our Node applications
module.exports = Exercise;