const generateToken = require('../token/generateToken.js');
const Admin = require('../model/admin.model.js');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        if (password !== admin.password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const tokenData = await generateToken({ _id: admin._id });
        console.log(tokenData);

        res.status(200).json({
            message: "Login Successfully",
            data: tokenData.token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const signup = async(req,res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
module.exports = {
    login,
    signup
};
