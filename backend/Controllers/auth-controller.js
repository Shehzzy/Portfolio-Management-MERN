var User = require('../Models/UserModel')
var jwt = require('jsonwebtoken')

// ADMIN registration API - Not for consuming
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: 'User already exists.' });
    }

    const userCreate = await User.create({ email, password });

    // Include role in JWT payload
    const token = jwt.sign(
      { userId: userCreate._id, email: userCreate.email, role: userCreate.role },  // Add role here
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token, message: 'User has been registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//ADMIN LOGIN API
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.json({ message: 'Invalid credentials' });
  }

  // Include role in JWT payload
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },  // Add role here
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({ token });
};


module.exports = { register, login }
