var User = require('../Models/UserModel');
var jwt = require('jsonwebtoken');

// ADMIN registration API - Not for consuming
const register = async (req, res) => {
    const { email, password } = rq.body;
    var userExists = await User.findOne({ email });
    var ifAnyUserExists = await User.find();
    try {
        if (ifAnyUserExists) { return res.json({ message: "Only one user can be registered." }); }
        if (userExists) { return res.json({ message: "User already exists." }) };

        var userCreate = await User.create({ email, password });
        const token = jwt.sign({ userId: userCreate._id, email: userCreate.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ token, message: "User has been registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

//ADMIN LOGIN API
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { return res.json({ message: "Invalid credentials" }); }
    const isMatch = await User.comparePassword(password);
    if (!isMatch) { return res.json({ message: "Invalid credentials" }); }

    const token = jwt.sign({userId:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return res.json({token});



}

module.exports = {register, login}; 