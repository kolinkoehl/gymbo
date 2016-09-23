/**
 * Created by kolinkoehl on 9/22/16.
 */
var express = require('express');
var router = express.Router();
var Exercise = require('../schema/exercise');

router.get('/', function (req, res) {
    res.json({message: 'testing our exercise API!'});
});

// more routes for our API will happen here


// ----------------------------------------------------
router.route('/exercise')

// create a exercise (accessed at POST http://localhost:3000/exercise)
    .post(function (req, res) {

        var exercise = new Exercise();      // create a new instance of the beer model
        exercise.name = req.body.name;  // set the exercise name (comes from the request)
        exercise.type = req.body.type; // type of exercise
        exercise.muscleGroup = req.body.muscleGroup; //muscle group
        exercise.rating = req.body.rating; // set the rating
        exercise.description = req.body.description; // exercise description

        // save the exercise and check for errors
        exercise.save(function (err) {
            if (err)
                res.send(err);
            else {
                res.json({message: exercise.name + ' created!'});

            }
        });

    })

    .get(function (req, res) {
        Exercise.find(function (err, exercise) {
            if (err)
                res.send(err);

            res.json(exercise);
        });
    });

router.route('/exercise/:exercise_id')

// get the beer with that id
    .get(function (req, res) {
        Exercise.findById(req.params.exercise_id, function (err, exercise) {
            if (err)
                res.send(err);
            res.json(exercise);
        });
    })

    .put(function (req, res) {

        // use our exercise model to find the exercise we want
        // http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
        Exercise.findById(req.params.exercise_id, function (err, exercise) {

            if (err)
                res.send(err);

            exercise.name = req.body.name;  // set the exercise name (comes from the request)
            exercise.type = req.body.type; // type of exercise
            exercise.muscleGroup = req.body.muscleGroup; //muscle group
            exercise.rating = req.body.rating; // set the rating
            exercise.description = req.body.description; // exercise description

            //save the bear
            exercise.save(function (err) {
                if (err)
                    res.send(err);
                else{
                    res.json({message: 'exercise updated!'});
                }

            });

        });
    })

    .delete(function (req, res) {
        Exercise.remove({
            _id: req.params.exercise_id
        }, function (err, exercise) {
            if (err)
                res.send(err);

            res.json({message: 'exercise Successfully deleted'});
        });
    });


module.exports = router;