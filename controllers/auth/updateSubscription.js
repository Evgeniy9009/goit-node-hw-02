const { HttpError } = require("../../helpers")
const { User } = require("../../models/user")

const updateSubscription = async (req, res, next) => {
    console.log(req.params)
    const {_id} = req.params
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true})
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result)
}

module.exports = updateSubscription