const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    putUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usercont');

// /api/users GET all and POST 
router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(putUser)
    .delete(deleteUser);
    
router.route('/:userId/friends')
.post(addFriend);

router.route('/:userId/friends/:friendId')
    
    .delete(deleteFriend);

module.exports = router;