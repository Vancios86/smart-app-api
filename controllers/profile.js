const handleProfile = (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.json('user was not found');
      }
    })
    .catch((err) => res.status(400).json('error founding user'));
};

export default handleProfile;
