import mongoose from "mongoose";
import User from "../../model/user.model.js";

export const createUser = async (req, res) => {
    const { username, email, password, confirmPassword, idNumber, mobileNumber } = req.body;

    console.log("Request body data:", req.body);  

    if (!username || !email || !password || !confirmPassword || !idNumber || !mobileNumber) {
        console.error("Missing fields:", { username, email, password, confirmPassword, idNumber, mobileNumber });
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }


    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    try {
    
        const existingUser = await User.findOne({ $or: [{ email }, { idNumber }] });
        if (existingUser) {
            console.error("User already exists with email or ID:", existingUser);
            return res.status(400).json({ success: false, message: "Email or ID number already exists" });
        }
        
        const newUser = new User({
            username,
            email,
            password,
            idNumber,
            mobileNumber,
        });

        await newUser.save();
        console.log("User created successfully:", newUser);  
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);

        
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ success: false, message: `${duplicatedField} already exists` });
        }

        res.status(500).json({ success: false, message: "Error creating user" });
    }
};
 

export const getUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("username entered: ",username);
  console.log("passweord is : ",password);
  
  try {
   
    const user = await User.findOne({ username });
    
    console.log(user);

    if (!user) {
    
      return res.status(404).json({ success: false, message: "User not found" });
    }

   
    if (user.password !== password) {
   
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
       
        username: user.username,
        password: user.password

      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Error during login" });
  }
};
