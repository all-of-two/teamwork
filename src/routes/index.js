const express = require('express');
const router = express.Router();

const signupRouter = require('./signup');
const postsRouter = require('./posts');
const loginRouter = require('./login');
const likesRouter = require('./likes');
const commentsRouter = require('./comments');

router.use('/signup', signupRouter);
router.use('/posts', postsRouter);
router.use('/login', loginRouter);
router.use('/likes', likesRouter);
router.use('/comments', commentsRouter);

module.exports = router;
