const handleSignin = (req, res, db, bcrypt) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(async (data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return await db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json('unable to get user data'));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch((err) => res.status(400).json('unable to sign in'));
};

export default handleSignin;
