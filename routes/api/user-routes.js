//get all users
// GET a single user by its _id and populated thought and friend data

// POST a new user:
// // example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// PUT to update a user by its _id

// DELETE to remove user by its _id

const router = require('express').Router();


const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser

} = require('../../controllers/user-controller');

// /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;