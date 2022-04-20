const UserModel = require('../models/userModel');

exports.getUserData = (req, res) => {
    console.log(`111111=${req.user}`)
    res.send(req.user); 
};

exports.updateUserData = async(req, res) => {
    const userId = req.user.id;
    const body = req.body 
    const user = await UserModel.findById(userId);
    user.aboutMe = body.aboutMe;
    user.favorite = body.favorite;
    user.caloriesGoal = body.caloriesGoal;
    user.durationGoal = body.durationGoal;
    await user.save();
    return res.status(201).send();
};