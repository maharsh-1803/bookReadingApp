const mongoose = require('mongoose');

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000;
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    otp_for: {
        type: String,
        require: true
    }
}, {
    timestamps: {
        currentTime: () => getISTTime()
    }
})

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp  