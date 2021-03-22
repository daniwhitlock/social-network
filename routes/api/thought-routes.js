const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought, 
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller.js');

// get all thoughts
router.route('/api/thought').get(getAllThought); // don't think I need all of that

// get thought by id
router.route('/api/thought/:thoughtId').get(getThoughtById);

// add thought /api/thought/<UserId>
router.route('/:userId').post(addThought);

// /api/thought/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.put(addReaction) 
.delete(removeThought);

// /api/thought/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;