const asyncHandler = require('express-async-handler')
const User=require("../models/userModel");
const generateToken = require('../utils/generateToken');
const registerUser=asyncHandler( async (req,res)=>{
    const{first_name,email,password,isTeacher,pic}=req.body;
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already Exists")
    }
    const user=await User.create(
        {
            first_name,email,password,isTeacher,pic
        }
    )
    if(user){
        res.status(201).json({

            _id:user._id,
            first_name:user.first_name,
            email:user.email,
            isTeacher:user.isTeacher,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw  new Error("Error Occured !!!");
    }
    


    res.json({
        first_name,
        email
    });
})
const loginUser=asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            first_name:user.first_name,
            email:user.email,
            isTeacher:user.isTeacher,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)

        })
    }
    else{
        res.status(400)
        throw  new Error("Invalid email or Password !!!");
    }
}
    )


    const updateUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.body._id);
        
      
        if (user) {
          user.first_name = req.body.first_name || user.first_name;
          user.email = req.body.email || user.email;
        //   user.pic = req.body.pic || user.pic;
          if (req.body.password) {
            user.password = req.body.password;
          }
      
          const updatedUser = await user.save();
      
          res.json({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            email: updatedUser.email,
            // pic: updatedUser.pic,
            // isAdmin: updatedUser.isAdmin,
            // token: generateToken(updatedUser._id),
          });
        } else {
          res.status(404);
          throw new Error("User Not Found");
        }
      });

      const getAllUsers = asyncHandler(async (req, res) => {
        const users = await User.find();
      
          res.json(
            users
          );
       
      });
module.exports={registerUser,loginUser,updateUserProfile,getAllUsers}