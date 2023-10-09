
const db = require('../model');

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, roles } = req.body;


    const existingEmailUser = await db.user.findOne({ where: { email } });
    if (existingEmailUser) {
      return res.status(400).json({ status: 'error', msg: 'Email already in use' });
    }


    const existingUsernameUser = await db.user.findOne({ where: { username } });
    if (existingUsernameUser) {
      return res.status(400).json({ status: 'error', msg: 'Username already in use' });
    }


    const validRoles = ['user', 'admin', 'moderator'];


    if (roles) {
      for (const role of roles) {
        if (!validRoles.includes(role)) {
          return res.status(400).json({ status: 'error', msg: 'Invalid role provided' });
        }
      }
    }


    req.body.roles = roles || ['user'];

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
};

module.exports = signUp;

