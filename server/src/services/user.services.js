const {userModel} = require("../models");
const generateToken = require("../services/token.service");

const signUp = async (req) => {
    const { username, email, password } = req;

    const existing = await userModel.findOne({ email });
    if (existing) {
        throw new Error("Email already exists. Try Signin.");
    }

    try {
        const user = await userModel.create({ username, email, password });
        return user;
    } catch (err) {
        throw new Error("User creation failed: " + err.message);
    }
};

const signIn = async ({email, password}) => {
    console.log(email, password)
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found.");

    const isMatch = await user.isPasswordsMatch(password);
    if (!isMatch) throw new Error("Incorrect password.");
     
    const token = generateToken(user._id);
    return {user: {_id: user._id, username: user.username, email}, token};
};

const updateUsername =  async (req) => {
    const user = await userModel.findById(req.userId);
    if (!user) throw new Error("User not found."); 

    user.username = username;
    await user.save();    
    return user.username;
};

const getUser =  async (req) => {
    const user = await userModel.findById(req.userId).lean();
    if (!user) throw new Error("User not found."); 
    return user;
};

module.exports = { signUp, signIn, getUser, updateUsername };
