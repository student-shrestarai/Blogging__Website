import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../User2.css';


const User = () => {


  const navigate = useNavigate();
   const[User , setUser] = useState({fullName:"" , email:"" , password:"" , role:""})
   const[message  , setMessage] = useState("")


   const handleChange=(e)=>{
    const{name , value} = e.target;
    setUser({
        ...User , [name]:name==="role" ? value.toUpperCase():value

    })
   }


   const handleLogin=()=>{
    navigate("/login")

   }

   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("sending data" , User)
    if(User.fullName===''|| User.email==='' || User.password==='' ||User.role===''){
             setMessage("Field cannot be Null")
             return
    }
    try{
        const response = await axios.post("http://localhost:8080/Registration" , User)
        setMessage(response.data);
    }
    catch(error){
         if (error.response) {
          setMessage(error.response.data || "An error occurred. Please try again.");
        } else {
          setMessage("Server is not responding. Please check your backend.");
        }

    }
    finally{
        setUser({fullName:"" , email:"" , password:"" , role:""})
    }
    

   }

  return (
//     <div className='UserContainer'>
//     <h3>Registration</h3>
//     <form onSubmit={handleSubmit}>
// <table>
//     <tr>
//         <th> <label  for='fullName' >Full Name</label></th>
//         <td><input type = "text" name = "fullName"  id='fullName'  value ={User.fullName}
//         onChange={handleChange}/></td>
//     </tr>
//      <tr>
//         <th> <label  for='email' >Email</label></th>
//         <td><input type = "email" name = "email"  id='email'  
//         value ={User.email}  onChange={handleChange}/></td>
//     </tr>
//      <tr>
//         <th> <label  for='password' >Password</label></th>
//         <td><input type = "password" name = "password"  id='password'  
//         value ={User.password}  onChange={handleChange}/></td>
//     </tr>
//     <tr>
//         <th> <label  for='role' >Role</label></th>
//         <td>
//     <select name="role" value={User.role} onChange={handleChange}>
//     <option value = ''>Choose an option</option>
//       <option value="USER">USER</option>
//       <option value="ADMIN">ADMIN</option>
//     </select>
//   </td>
//     </tr>
//      <tr>
//               <td><button type="submit"> Register</button></td> </tr>

//                <tr>
//                 <td><p>Already Registered ?</p></td>
//               <td><button onClick={handleLogin}> LOGIN</button></td> 
//               </tr>
            
          


// </table>
//     </form>
//      {message && <p style={{ color: "red" }}>{typeof message === "string" ? message : "An error occurred"}</p>}

      
//     </div>

   <div className="auth-body">
<div className='user-container'>
      <h3>Create Account</h3>
 <form onSubmit={handleSubmit} className="user-form">
    <div className="form-group">
        <label htmlFor='fullName' className="user-label">Full Name</label>
        <input
            type="text"
            name="fullName"
            id="fullName"
            className="user-input"
            value={User.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
        />
    </div>

    <div className="form-group">
        <label htmlFor='email' className="user-label">Email</label>
        <input
            type="email"
            name="email"
            id="email"
            className="user-input"
            value={User.email}
            onChange={handleChange}
            placeholder="Enter your email"
        />
    </div>

    <div className="form-group">
        <label htmlFor='password' className="user-label">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            className="user-input"
            value={User.password}
            onChange={handleChange}
            placeholder="Enter your password"
        />
    </div>

    <div className="form-group">
        <label htmlFor='role' className="user-label">Role</label>
        <select
            name="role"
            id="role"
            className="user-select"
            value={User.role}
            onChange={handleChange}
        >
            <option value=''>Choose an option</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
        </select>
    </div>

    <button type="submit" className="user-button">Register</button>

    <p>Already Registered?</p>
    <button type="button" onClick={handleLogin} className="user-button login-button">Login</button>
</form>
</div>
</div>


  )
}

export default User
