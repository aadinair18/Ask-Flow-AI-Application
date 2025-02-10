const express = require('express');
const { postBlogs, getAllBlogs } = require('../controllers/blogsController');
const middlewareChecks = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/postBlogs', middlewareChecks, postBlogs);
router.get("/getBlogs", middlewareChecks, getAllBlogs);

module.exports = router;