const { User } = require('../models')

const userdata = [
  {
    username: 'Iqbal',
    password: 'password123',
  },
  {
    username: 'Sam',
    password: 'password1234',
  },
  {
    username: 'Michelle',
    password: 'password12345',
  },
]

const seedUser = () =>
  User.bulkCreate(userdata, {
    individualHooks: true,
  })

module.exports = seedUser
