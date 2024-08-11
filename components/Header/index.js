import React, { useEffect } from 'react';
import "./style.css";
import { auth } from '../../firebase'; 
import { useAuthState } from "react-firebase-hooks/auth";
import { Firestore } from 'firebase/firestore';
import {useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from '../../assests/user.svg'
function Header() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
       if(user){
        navigate("/dashboard");
       }
    },[user,loading])
    function logoutFnc(){
 try{
    signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out Successfully!")
        navigate("/");
      }).catch((error) => {
        toast.error(error.message);
        // An error happened.
      });
 }catch(e){
    toast.error(e.message);
 }

    }
  return (
    <div className="navbar">
    <p className="logo">Personal-Bookkeeper</p>
    {user&&(
      <div style={{display:"flex", alignItems:"center",gap:"0.75rem"}}>
        <img src={user.photoURL?user.photoURL: userImg}  style={{borderRadius:"50%",height:"2rem", width:"2rem"}}/>
      <p className="logo link" onClick={logoutFnc}>Logout</p>
      </div>)}
    
    </div>
  )
}

export default Header;