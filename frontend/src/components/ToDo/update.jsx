import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Update = ({showUpdate,updateArray}) => {
 
  useEffect(() => {
    setCurr({
      title: updateArray.title,
      body: updateArray.body,
    });
  }, [updateArray]);

  const [curr,setCurr]=useState({title:"",body:""});

  const updateFunc=async()=>{
    await axios.put(`http://localhost:5000/api/v2/updateTask/${updateArray._id}`,curr).then((response) => {
      toast.success(response.data.message);
    });
    
    showUpdate("none");
  }
  const change=(e)=>{
    const {name,value}=e.target;
    setCurr({...curr,[name]:value})
  }

  return (
    <div className="p-5  d-flex justify-content-center align-items-start flex-column update ">
        <h3>Update Your Task</h3>
        <input type="text" className="todo-inputs my-4 w-100 p-3" value={curr.title} name="title" onChange={change}/>
        <textarea className="todo-inputs w-100 p-3" value={curr.body} name="body" onChange={change}/>
        <div>

        <button className="btn btn-dark my-4" onClick={updateFunc} >
          UPDATE
        </button>
        <button className="btn btn-danger mx-3 my-4"
         onClick={()=> showUpdate("none")} >
          Close
        </button>
        </div>
    </div>
  );
};

export default Update;