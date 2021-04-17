
const { User } = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
      // DELETE to pull and remove a reaction by the reaction's reactionId value
      removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = UserController;