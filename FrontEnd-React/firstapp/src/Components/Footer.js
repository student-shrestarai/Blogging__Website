import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <footer>
        <div className='foot_container'>
        <div className='footer_1'>
        <p>Blogger's </p>
        <i>Your best travel Companion</i>
    </div>
   

    <div className='footer_contact'>
        <p>CONTACT US</p>
        <p className='footer_qustions'>FAQ</p>
    </div>


     <div className='footer_2'>
        <p>Quick Links</p>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
             <li>Login</li>
        </ul>
    </div>


    <div className='footer_3'>
        <p>Follow us</p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin-in"></i>
  </a>
    </div>
     <div className='footer_4'>
        <h3>Subscribe</h3>
      <input type="email" className='email_box' placeholder="Enter your email" />
      <button  className='sub_button'>SUBSCRIBE</button>
        
    </div>



        </div>
    
    <div className='bottom_footer'>
   <p>Copyright © 2025 Blogger's</p>
    </div>
    </footer>
  )
}

export default Footer
