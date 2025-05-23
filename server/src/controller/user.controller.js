const { userService } = require("../services"); 

const signUp = async (req, res) => { 
    try {
        const newUser = await userService.signUp(req.body);
        res.status(200).send({message: "SignUp Successfull.", user: newUser});
    } catch (error) {
        res.status(500).send({message: error.message});
    }   
};

const signIn = async (req, res) => { 
    try {
        const {user, token} = await userService.signIn({...req.body}); 
        res.status(200).send({message: "SignIn Successfull.", user, token});
    } catch (error) {
        res.status(500).send({message: error.message});
    }   
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser({...req.params}); 
        res.status(200).send({...user});
    } catch (error) {
        res.status(500).send({message: error.message});
    }  
}
module.exports = { signUp, signIn, getUser };