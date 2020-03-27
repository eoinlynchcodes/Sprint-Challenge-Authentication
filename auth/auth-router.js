const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const AccountHelpers = require('../helperFunctions/helperFunctions')
const authenticate = require('../auth/authenticate-middleware')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'You are in auth router'})
})

router.post("/register", (req, res) => {
  // implement registration
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 6);

  AccountHelpers.add({
    username,
    password: hashedPassword
  })
  .then(data => {
    res.status(201).json(data)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Yea, nah dawg...'})
  })
});

router.post("/login", (req, res) => {
  // implement login

  // const { username, password } = req.body
  // AccountHelpers.findBy({ username }).first()
  // .then(user => {
  //   if(user && bcrypt.compareSync(password, user.password)){

  //     req.session.user = user
  //     res.json({message: 'Yeah, you\'re in..'})
  //   } else {
  //     res.status(401).json({ message: 'Nah, not happening amigo...'})
  //   }
  // })
  // .catch(error => {
  //   console.log(error)
  // })

  const { username, password} = req.body;

  AccountHelpers.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // make a token
        // 1- decide a payload
        const payload = {
          sub: user.id,
          username: user.username,
          roles: ['student'],
        }
        // 2- decide config (like exp data)
        const options = {
          expiresIn: 60,
        }
        // 3- build & sign the token
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET || 'secret',
          options,
        )

        res.json({
          message: 'Here is your token, do not lose it!!!!',
          token,
        })
        // 4- send token back
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.get('/logout', (req, res) => {
  console.log('logout endpoint')
  if(req.session){
    req.session.destroy(error => {
      if(error){
        res.json({message: 'You have to stay, sorry.'})
      } else {
        res.json({message: 'cya.'})
      }
    })
  }
})

module.exports = router;
