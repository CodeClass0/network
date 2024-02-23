const router = require('express').Router();

const {
    getThoughts,
} = require('../../controllers/thoughtcontroller');

// /api/courses
router.route('/')
.get(getThoughts)
// .post(createThought);

module.exports = router;