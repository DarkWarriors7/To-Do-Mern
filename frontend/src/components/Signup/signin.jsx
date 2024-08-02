import React, { useState } from "react";
import "./signin.css";
import HeadingComp from "./headingComponent";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
    const dispatch=useDispatch();
    const history=useNavigate();
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    })

    const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...inputs,[name]:value})
    }

    const submit=async (e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/v1/signin`,inputs).then((res)=>{
            console.log(res.data);
            sessionStorage.setItem("id",res.data.user._id)
            dispatch(authActions.login())
            history("/todo");
        })
    } 

  return (
    <div className="signup">
        <div className="container">
            <div className="row">
            <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
                <HeadingComp first="Sign" second="In" />
                </div>
                <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column w-100 p-5">
                        <input
                            className="p-2 my-3 input-signup"
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            onChange={change}
                            value={inputs.email}
                        />
                        <input
                            className="p-2 my-3 input-signup"
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            onChange={change}
                            value={inputs.password}
                        />
                        <button className="btn-signup p-2" onClick={submit}>Sign In</button>
                    </div>
                </div>
                
            </div>
        </div>
      
    </div>
  );
};

export default Signin;