const express = require('express')
const path = require('path')
const controller = require('./controllers')
const exphbs = require('express-handlebars')
const sequelize = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')

const sess = {
  secret: 'super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

const app = express()
const PORT = process.env.PORT || 3001

// middlewears
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))

// controllers
app.use('/', controller)

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

sequelize.sync({ force.false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`) )
})
