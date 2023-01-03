const { Schema, model } = require("mongoose")
const Joi = require("joi")
const {handleMongooseError} = require("../helpers")

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false,
        // enum: ["111", "222"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
    
}, { versionKey: false, timestamps: true })

contactSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    addSchema,
    updateFavoriteSchema
}

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    schemas
}