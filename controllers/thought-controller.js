const { Thought, User } = require('../models');
// const { db } = require('../models/User');

const thoughtController = {

    // GET to get all thoughts /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ createdAt: -1 })// cursor sorts/ sort ascending mongodb -1 descending last one first, 1 ascending
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // GET to get a single thought by its _id /api/thoughts/:id
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field) 
    //   /api/thoughts/:id
    // // example data
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(dbThoughtdata => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thought: dbThoughtData._id } },
                    { new: true } //need new: true to push it
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // PUT to update a thought by its _id  /api/thoughts/:id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }, 
    // DELETE to remove a thought by its _id  /api/thoughts/:id
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

//TO DO: 
// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value


module.exports = thoughtController;











