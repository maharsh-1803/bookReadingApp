const sgMail = require('@sendgrid/mail')
const Investor = require('../model/InvestorSchema')
const Otp = require('../model/otpSchema')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const otpSetUp = async (emailid, otp) => {

    const msg = {
        to: emailid,
        from: {
            email: '57rakesh17@gmail.com',
            name: 'WebEarl Technologies Pvt Ltd'
        },
        subject: 'otp Verification',
        text: `Your OTP is: ${otp}`,
        html: `Your OTP is : ${otp}`,
    }

    sgMail.send(msg)
        .then(() => {
            console.log("Email sent successfully")
        })
        .catch((error) => {
            console.error(error)
        })
}
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtp = async (req, res) => {
    try {
        const { emailid } = req.body;
        const generatedOtp = generateOtp();

        const findEmail = await Investor.findOne({ InvestorEmail: emailid });

        if (!findEmail) {
            return res.status(400).json({
                message: "Investor email not found",
            });
        }

        await otpSetUp(emailid, generatedOtp);

        let otpData = await Otp.findOne({ emailid: emailid });

        if (otpData) {
            otpData = await Otp.findOneAndUpdate(
                { emailid: emailid },
                { $set: { otp: generatedOtp, otp_for: 'fp' } },
                { new: true }
            );
        } else {
            otpData = new Otp({
                emailid: emailid,
                otp: generatedOtp,
                otp_for: 'verification'
            });
            await otpData.save();
        }

        return res.status(200).json({
            message: "otp sent successfully"
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const   verifyOtp = async (req, res) => {
    try {
        const { emailid, otp } = req.body;
        const otpData = await Otp.findOne({ emailid });
        if (!otpData) {
            return res.status(400).send({ message: "investor not found" })
        }
        if (otp !== otpData.otp) {
            return res.status(400).send({ message: "invalid otp" });
        }
        await Otp.findOneAndUpdate({ emailid: emailid }, { $set: { otp: null, otp_for: "verification" } })
        return res.status(200).send({ message: "otp verified successfully" })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const resendOtp = async (req, res) => {
    try {
        let { emailid } = req.body;

        if (!emailid) {
            return res.status(400).json({
                succuss: false,
                message: "Email is required",
            });
        }
        let otp = generateOtp();
        await otpSetUp(emailid, otp);
        await Otp.findOneAndUpdate({ emailid }, { otp: otp });
        res.status(200).json({
            success: true,
            message: "otp resend succussfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error",
        });
    }
}


module.exports = {
    sendOtp,
    verifyOtp,
    resendOtp
}