const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const sequelize = require('../config/connection')

// user section
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No posts availabe' })
        return
      }
      const posts = dbPostData.map((post) => post.get({ plain: true }))
      console.log(posts)
      res.render('home', { posts, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/viewpost/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'post_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post availabe!' })
        return
      }
      const post = dbPostData.get({ plain: true })
      console.log(post)
      const myPost = post.user_id == req.session.user_id
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: myPost,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
  console.log('Is logged in?', req.session.loggedIn)
  res.render('login', { loggedIn: req.session.loggedIn })
})

router.get('/dashboard', (req, res) => {
  console.log(req.session.user_id, ' this is the session id')
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: 'No Posts Available' })
        return
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })) // serialize all the posts
      console.log(posts)
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/edit/:id', (req, res) => {
  res.render('edit-post', {
    loggedIn: req.session.loggedIn,
    post_id: req.params.id,
  })
})
module.exports = router
