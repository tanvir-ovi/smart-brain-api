const signin = (db,bcrypt) => (req, res) => {
  const { password, email } = req.body;
  db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
      if (bcrypt.compareSync(password, data[0].hash)) {
        db.select('*').from('users').where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json("unable to get user!"))
      } else {
        res.status(400).json("wrong credentials!");
      }
  })
  .catch(err => res.status(400).json(err));
}

module.exports = signin;