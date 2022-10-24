const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // To not reveal the password hash
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
