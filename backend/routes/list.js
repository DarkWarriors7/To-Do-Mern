const router =require('express').Router();
const User=require('../models/user')
const List=require('../models/list')

router.post("/addTask", async (req, res) => {
    try {
      const { title, body, id } = req.body;
      const existingUser = await User.findById(id);
      if (existingUser) {
        const list = new List({ title, body, user: existingUser });
        await list.save().then(() => res.status(200).json({ list }));
        existingUser.list.push(list);
        existingUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/updateTask/:id',async (req,res)=>{
    try{
        const {title,body}=req.body;
        const list=await List.findByIdAndUpdate(req.params.id,{title,body})
         await list.save().then(()=>res.status(200).json({message:"Task Updated"}));

    }catch(err){
        console.log(err)
    }
  })

  router.delete('/deleteTask/:id',async (req,res)=>{
    try{
        const {id}=req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            {$pull:{list:req.params.id}});
        if (existingUser) {
            await List
            .findByIdAndDelete(req.params.id)
            .then(()=>res.status(200).json({message:"Task Deleted"})); 
        }

    }catch(err){
        console.log(err)
    }
  })

  router.get('/getTasks/:id',async (req,res)=>{
    try{
        const list = await List.find({ user: req.params.id }).sort({
            createdAt: -1,
          });
          if (list.length !== 0) {
            res.status(200).json({ list: list });
          }else{
            res.status(200).json({ message:"No tasks" });
          }
    }catch(err){}
  })

module.exports=router;