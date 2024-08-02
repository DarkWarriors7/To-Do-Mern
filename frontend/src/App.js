import React, { useEffect } from "react"
import './App.css';
import Navbar from "./components/navbar/navbar";
import Home from "./components/Home/home";
import Footer from "./components/Footer/footer";
import About from "./components/about/about"
import Signup from "./components/Signup/signup";
import Signin from "./components/Signup/signin";
import Todo from "./components/ToDo/todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"

const App=()=>{
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[])
  return <div>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </Router>
    
    
    <Footer />
    </div>
}

export default App;
