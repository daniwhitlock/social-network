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
router.route('/')
    .get(getAllThought)
    .post(addThought);

// get thought by id
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/<thoughtId>/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thought/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;