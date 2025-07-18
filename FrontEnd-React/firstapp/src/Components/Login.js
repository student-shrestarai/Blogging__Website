import React from 'react'
import{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css';


const Login = () => {

  const navigate = useNavigate();
     const[loggedUser , setloggedUser] = useState({ email:"" , password:"" })
       const[message  , setMessage] = useState("")

      


        const handleChange = (e) => {
    const { name, value } = e.target;
    setloggedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

       const handleLogin= async(e)=>{
        e.preventDefault()
        console.log("Aunthenticating User" , loggedUser)
        if(loggedUser.email===''|| loggedUser.password===''){
            setMessage("Filed cannot be Empty")
            return
        }
        try {
      // Make login request
      const response = await axios.post("http://localhost:8080/Login", loggedUser);

      // Save JWT token to local storage
      localStorage.setItem("token", response.data.token);

      setMessage("Login successful!");
      console.log("JWT Token:", response.data.token);

      // Optional: redirect to dashboard or home
      navigate("/home");


    } catch (error) {
      if(error.response){
        setMessage("Invalid email or password");
      console.error("Login failed:", error);
      }
      else{
        console.log("Server Errror")
      }
    }
  };


  const handleRegister=()=>{
    navigate("/")
  }

     
  return (
//     <div className = 'loginContainer'>
//       <form onSubmit={handleLogin}>
//         <table>
//             <tr>
//                 <th><label htmlFor='email'>Email</label></th>
//                 <input type ="email"  name = 'email' id='email' value={loggedUser.email} onChange={handleChange}/>
//             </tr>
//              <tr>
//                 <th><label htmlFor='password'>Password</label></th>
//                 <input type ="password"  name = 'password' id='password' value={loggedUser.password} onChange={handleChange}/>
//             </tr>
//             <tr><td><button type='submit'>Login</button>
// </td></tr>
//         </table>
//       </form>

//         {message && <p style={{ color: "red" }}>{typeof message === "string" ? message : "An error occurred"}</p>}

//     </div>

   <div className="auth-body">
<div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor='email' className="login-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="login-input"
            value={loggedUser.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor='password' className="login-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="login-input"
            value={loggedUser.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login_button">Login</button>
         <p>Not Registered ?</p>
         <button type="submit" onClick={handleRegister} className="reg_button">Register</button>

      </form>
      {message && (
        <p className="error-message">
          {message}
        </p>
      )}
    </div>
    </div>
  )
}


export default Login
