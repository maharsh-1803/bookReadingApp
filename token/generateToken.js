const jwt = require('jsonwebtoken');

const generateToken = async ({ _id }) => {
    try {
        const payload = { _id };
        const token = jwt.sign(payload, "captain", { expiresIn: '10d' });
        return { token };
    } catch (error) {
        console.error('Token generation error:', error);
        throw new Error('Token generation failed');
    }
}

module.exports = generateToken;
