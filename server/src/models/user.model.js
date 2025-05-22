const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, minLength: 8, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) { 
  if (!this.isModified('password')) {
    return next();
  }
  try { 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(this.password, salt); 
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordsMatch = async function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);