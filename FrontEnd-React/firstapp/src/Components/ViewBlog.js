import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import "./ViewBlog.css";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../authUtils';
import { MdEdit, MdDelete } from 'react-icons/md';



const ViewBlog = () => {


    const[Blogs , setBlogs] = useState([]);
    const navigate = useNavigate();
    const role=  getRoleFromToken();
    console.log("Role returned from getRoleFromToken:", role);
    // if(role==='ROLE_ADMIN'){
    //     console.log("admin")
    // }


   useEffect(()=>{
   axios.get("http://localhost:8080/home" , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
    .then(res=>setBlogs(res.data))
    .catch(err=>console.log("Failed to load blog", err));
   },[])

   const handleDelete = (id, e) => {
        e.stopPropagation(); // prevent card navigation
        if (window.confirm('Are you sure you want to delete this blog?')) {
            axios.delete(`http://localhost:8080/home/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => {
                    setBlogs(Blogs.filter(blog => blog.id !== id));
                })
                .catch(err => {
                    console.log('Failed to delete blog', err);
                    alert('Delete failed. You may not have permission.');
                });
        }
    };

    const handleEdit = (id, e) => {
        e.stopPropagation(); // prevent card navigation
        navigate(`/edit-blog/${id}`);
    };



  return (
    <div className="viewContainer">
        <h1>Top Blogs</h1>
        {/* iterat
        e over each blog component */}
       {Blogs.map(Blog=>(
        <div key={Blog.id}  onClick={()=>{navigate(`/blog/${Blog.id}`)}}>
            <h1>{Blog.title}</h1>
            <img src={Blog.coverImageUrl} alt="ph"/>
            <h2>Authored By {Blog.author}</h2>
             {role === "ADMIN" && (
                        <div className="adminIcons">
        <MdEdit 
            onClick={(e) => handleEdit(Blog.id, e)} 
            className="icon editIcon" 
            title="Edit Blog"
        />
        <MdDelete 
            onClick={(e) => handleDelete(Blog.id, e)} 
            className="icon deleteIcon" 
            title="Delete Blog"
        />
    </div>
                    )}
        </div>

       )

       )}
      
    </div>
  )
}

export default ViewBlog
