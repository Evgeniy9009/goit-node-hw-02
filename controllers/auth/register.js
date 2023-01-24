const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const { User } = require("../../models/user")

const { BASE_URL } = process.env

const { HttpError, sendEmail } = require("../../helpers")

const register = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid()
    
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken})

    const verifyEmail = {
        to: email,
        subject: "verify you email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

module.exports = register