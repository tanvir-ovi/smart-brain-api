const profileGet = (db) => (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("No such user!");
      }
    })
    .catch(err =>res.status(400).json("error getting in"))
}

const profileUpdate = (db) => (req, res) => {
  const { id } = req.params;
  const { name,age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name })
    .then(resp => {
      if (resp) {
        res.json("succesfully updated users!");
      }
      else res.status(400).json("unable to update!");
    })
    .catch(err => res.status(400).json("error updating user!"));
}

module.exports = {
  profileGet,
  profileUpdate
};