
const register = (bcrypt, db) => (req, res) => {
  const { password, name, email } = req.body;
  if (!password || !name || !email) {
    return res.status(400).json("wrong format of submission")
  }
  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        db('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date().toLocaleString()
          })
          .then(user => res.json(user[0]))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    
  })
    .catch(err => res.status(400).json("heda"));
  
}

module.exports = register;