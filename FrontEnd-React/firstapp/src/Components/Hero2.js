import React from 'react'
import './Hero2.css';
import { useNavigate } from 'react-router-dom';

const Hero2 = () => {

  const navigate = useNavigate();



  const handleBlog = ()=>{
    navigate("/blogging")
   
  }
  return (
    
      <div className="hero2Container">
        <h2>A Community for travellers</h2>
        <p>Blogger is a trusted community for modern luxury travellers. Find inspiration, book unique journeys, and connect with like-minded members.</p>
<button className="regBox" onClick={handleBlog}>Star Blogging !</button>

      </div>
    
  )
}

export default Hero2
