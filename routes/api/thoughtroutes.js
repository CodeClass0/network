const router = require('express').Router();

const { 
    getThoughts, 
    getThoughtById, 
    createThought, 
    putThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtcontroller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
.get(getThoughtById)
.put(putThought)
.delete(deleteThought); 


router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;