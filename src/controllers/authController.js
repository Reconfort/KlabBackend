import User from "../models/authModels";

import jwt  from "jsonwebtoken";


// Generate tokens for user 
// const  getToken  = async (user)=> {
//   return  await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
// }


// Create new user
export const createUser = async (req, res) => {
    console.log(req.body);
    try {
      const  user   =   await  User.findOne({email:req.body.email});
      if(user) {
        return  res.status(409).json({
          status:"fail",
          message:"Email has been taken by other user",
        })
      }
      let newUser = await  User.create({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: req.body.password
      })
      // const token  =  await  getToken(user);
    // const user = new User(req.body);
   console.log(user);
    res.status(201).json(
      {  
        status:true,
        user
        // token,
      
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 
export const login=async (req,res,next)  => {
    try { 

    
       const  user  =  await  User.findOne({email:req.body.email});

       if (!user) {
       return  res.status(401).json({
        status:"fail",
        email:"invalid email"
       })        
       }

        if(user.password !== req.body.password){
   return   res.status(401).json({
    status:"fail",
    email:"incorrect email and password"
   }) 
     } 
      
      return  res.status(200).json({
        token: await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"}),
        status:"success",
        user
      })
     
     // if()
    


    } catch (error) {
      console.log(error);
    }

}
 
// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error('User not found');
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw Error('User not found');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error('User not found');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
