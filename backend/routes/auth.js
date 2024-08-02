const router=require('express').Router();
const User=require('../models/user');
const bcrypt = require ('bcrypt');

router.post('/register',async (req,res)=>{
    try{
        const {email,username,password}=req.body;
          
            const salt=await bcrypt.genSalt(10);
            const hashedPw=await bcrypt.hash(password,salt);
            const user=new User({email,username,password:hashedPw});
            await user
            .save()
            .then(() => res.status(200).json({ message: "Sign Up Successfull" }));
    } catch (error) {
        res.status(200).json({ message: "User Already Exists" });
    }
})

router.post("/signin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .json({ message: "User not found. Please Sign Up First" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(200).json({ message: "Password is not correct" });
      }
  
      const { password, ...others } = user._doc;
      res.status(200).json({ user: others });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports=router;