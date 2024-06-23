const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: "/images/images.png"
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre("save", function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Generate a unique salt
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
  
  user.salt = salt;
  user.password = hashedPassword;

  next();
});

// Static method to match password
userSchema.static("matchPassword", async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const userProvidedHash = createHmac("sha256", user.salt).update(password).digest("hex");
    if (user.password !== userProvidedHash) throw new Error("Password does not match");

    const token = createTokenForUser(user);
    return token;
  } catch (error) {
    console.error("Error in matchPassword:", error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
