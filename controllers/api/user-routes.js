const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

// user section
router.get('/', (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'email', 'password'],
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['id', 'title', 'body'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  })
    .then((dbUserData) => {
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'username', 'email', 'password'],
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['id', 'title', 'body'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'post_id'],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.loggedIn = true
        res.json(dbUserData)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/:login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      const validPassword = dbUserData.checkPassword(req.body.password)

      if (!validPassword) {
        res.status(404).json({ message: 'Incorrect password entered!' })
        return
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.loggedIn = true
        res.json({ user: dbUserData, message: 'You are now logged in!' })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
  res.send(`update user`)
})
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})
module.exports = router
