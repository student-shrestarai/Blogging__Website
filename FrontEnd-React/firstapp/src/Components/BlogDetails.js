import React from 'react'
import "./BlogDetails.css";
import{useState} from 'react'
import{useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';




const BlogDetails = () => {

 const { id } = useParams();
    const[mainblog , setmainblog]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:8080/home/${id}` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        .then((res)=>setmainblog(res.data))
        .catch((err)=>{console.log("failed to load")})

    } , [id]

    )

    function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }


    if(!mainblog) return<p>loading .....</p>
  return (
    <div className="BlogDetail"  >

    <h1>{mainblog.title}</h1>
    <img  className="BlogImage"  src={mainblog.coverImageUrl} alt="Cover" style={{ width: '80%', maxHeight: '300px', objectFit: 'cover' }} />
    <div dangerouslySetInnerHTML={{ __html:decodeHtml(mainblog.content) }} />
     {/* <p><strong>By:</strong> {mainblog.author}</p> */}
  
    </div>
  )
}

export default BlogDetails
