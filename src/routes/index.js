const express = require('express');
const router = express.Router();

const signupRouter = require('../routes/signup')
const postsRouter = require('../routes/posts')
const loginRouter = require('../routes/login')
const likesRouter = require('../routes/likes')
const commentsRouter = require('../routes/comments')

router.use('/signup', signupRouter)
router.use('/posts', postsRouter)
router.use('/login', loginRouter)
router.use('/', likesRouter)
router.use('/comments', commentsRouter)

module.exports = router;
