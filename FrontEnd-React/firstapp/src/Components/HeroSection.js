import React from 'react'
import './Mainhero.css';
const HeroSection = () => {
  return (
    <div className="heroContainer">
     <div className="hero_Item">

      <div className="heroText">
         <h1>
          <span>Travel</span>
          <span>
            <img
            className="starIcon"
            src="https://dv4xo43u9eo19.cloudfront.net/assets/scalable/asw_logo_star_white-35480c3b7d4b8eb6083950cde8f6c0e5ed1c49f8d6198992bc42458d3ef0f70a.svg"
            alt="Star"
          />
          </span>
           <span>Discover </span>
           <span>
            <img
            className="starIcon"
            src="https://dv4xo43u9eo19.cloudfront.net/assets/scalable/asw_logo_star_white-35480c3b7d4b8eb6083950cde8f6c0e5ed1c49f8d6198992bc42458d3ef0f70a.svg"
            alt="Star"
          />
           </span>
          <span>Belong</span>
          </h1>
      </div>
    </div>

    </div>
  )
}

export default HeroSection
