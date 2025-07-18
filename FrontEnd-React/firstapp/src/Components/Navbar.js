// import React from 'react'
// import './Nav.css';
// import { useState } from 'react';
// import{useEffect} from 'react';

// const Navbar = () => {

//   const[scrolled , setscrolled]=useState(false);
//   useEffect(()=>{
//     const handleScroll=()=>{
//       setscrolled(window.scrollY>50);
//     };
//     //if scroll is detected call funtion
//     window.addEventListener('scroll' , handleScroll);

//  return () => {
//     // Clean up when component unmounts
//     window.removeEventListener('scroll', handleScroll);
//   };

//   }, []

//   )
//   return (
//    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//    <div className="container">
//      <div className='logo'>
//      <p>BLOGGER</p>
//     </div>
//     <div className='nav_link' >
//         <ul>
//             <li className="link">Home</li>
//             <li className="link">Blog</li>
//             <li className="link">Register</li>
//            <li><button className='login'>Login</button></li>
        
            
//         </ul>

//     </div>
//    </div>

//    </nav>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../getUserFromToken';
import { logout } from '../getUserFromToken';
import { useParams } from 'react-router-dom';





const Navbar = ({ forceSolid = false }) => {
    const [scrolled, setScrolled] = useState(forceSolid);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const user = getUserFromToken();
    const gmail = user.email;

    // Extract initials cleanly
    let initials = '';
    if (user && user.name) {
        const nameParts = user.name.split(' ');
        initials = nameParts[0][0];
        if (nameParts.length > 1) {
            initials += nameParts[1][0];
        }
        initials = initials.toUpperCase();
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrolled(window.scrollY > 50);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

     useEffect(() => {
        if (forceSolid) return; // disable scroll tracking

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [forceSolid]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

   const handleMyBlogs=()=>{
    navigate(`MyBlog/${gmail}`)

   }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <p onClick={() => navigate('/')}>BLOGGER</p>
                </div>

                <div className="nav_link">
                    <ul>
                        <li className="link" onClick={() => navigate('/home')}>Home</li>
                        <li className="link" onClick={() => navigate('/getblog')}>Blog</li>
                        <li className="link" onClick={() => navigate('/')}>Register</li>
                        <li><button className="login" onClick={() => navigate('/login')}>Logout</button></li>
                    </ul>
                </div>
                

                {/* Avatar Dropdown for logged-in users */}
                {user && (
                    <div className="profileDropdown">
                        <div
                            className="avatarCircle"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {initials}
                        </div>

                        {dropdownOpen && (
                            <div className="dropdownMenu">
                                {user.role === 'ROLE_ADMIN' && (
                                    <>
                                        <button onClick={() => navigate('/admin-users')}>Track Users</button>
                                        <button onClick={() => navigate('/view-blogs')}>All Blogs</button>
                                    </>
                                )}
                                {user.role !== 'ROLE_ADMIN' && (
                                    <button onClick={handleMyBlogs}>My Blogs</button>
                                )}
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

