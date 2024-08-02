import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./todoCards"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./update";
import axios from "axios";
 
let updateArray=[];
let id =sessionStorage.getItem("id");
const Todo = () => {
    const [inputs,setInputs]=useState({title:"",body:""})
    const [array,setArray]=useState([]);
   
    const show=()=>{
        document.getElementById("textarea").style.display="block"
    }
    const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...inputs,[name]:value})
    }
    const  submit=async()=>{
        if(inputs.title==="" || inputs.body===""){
          toast.error("Title or Body should not be empty!!");
        }
        else{
          if(id){
            await axios
            .post("http://localhost:5000/api/v2/addTask",{title:inputs.title,body:inputs.body,id:id})
            .then((res)=>console.log(res))
            
            setInputs({title:"",body:""})
            toast.success("Your task is added!!")
          }else{
            setArray([...array,inputs])
            setInputs({title:"",body:""})
            toast.success("Your task is added!!")
            toast.error("Your Task is not saved!! You need to signup!!")
          }

          
        }
    }
    const delFunc=async(cardId)=>{
      
      if(id){

        await axios
        .delete(`http://localhost:5000/api/v2/deleteTask/${cardId}`,{data:{id:id}})
        .then(()=>{
          toast.success("Your Task Is Deleted");
        })
      }else {
        toast.error("Please SignUp First");
      }
    }
    const showUpdate=(value)=>{
      console.log(value);
        document.getElementById("todo-update").style.display=value
    }
    const updateFunc=(value)=>{
      updateArray=array[value];
    }

    useEffect(() => {
      if (id) {
        const fetch = async () => {
          await axios
            .get(`http://localhost:5000/api/v2/getTasks/${id}`)
            .then((response) => {
              setArray(response.data.list);
            });
        };
        fetch();
      }
    }, [submit]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
          <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
              <div className="d-flex flex-column todo-inputs-div w-50  p-1">
              <input 
                  className="my-2 p-2 todo-inputs" 
                  type="text" 
                  name="title"
                  placeholder="Title"  
                  onClick={show}
                  onChange={change}
                  value={inputs.title}
              />
              <textarea 
                  id="textarea"
                  className="p-2 todo-inputs" 
                  type="text" 
                  placeholder="Body"
                  name="body"
                  onChange={change}
                  value={inputs.body}
                  
                  />

              </div>
              <div className=" w-50 d-flex justify-content-end my-3">
                  <button className="home-btn px-2 py-1" onClick={submit}>
                  Add
                  </button>
              </div>
          </div>
          <div className="todo-body">
            <div className="container-fluid">
              <div className="row ">
                {array &&
                  array.map((item, index) => (
                    <div
                      className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                      key={index}
                    >
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delFunc={delFunc}
                        showUpdate={showUpdate}
                        updateId={index}
                        toBeUpdated={updateFunc}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update showUpdate={showUpdate} updateArray={updateArray} />

        </div>
      </div>
    </>
  );
};

export default Todo;