const express = require('express');
const { getLikes, addLike, removeLike } = require('../controllers/likes');
const router = express.Router();

router.post('/:productId', addLike);
router.get('/:productId', getLikes);
router.delete('/:productId', removeLike);

module.exports = router;