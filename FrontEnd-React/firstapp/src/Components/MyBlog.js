import React, { useEffect, useState } from 'react';
import './MyBlog.css';
import { getUserFromToken } from '../getUserFromToken';
import axios from 'axios';

const MyBlog = () => {
    const user = getUserFromToken();
    const gmail = user.email;

    const [content, setcontent] = useState([]);
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        console.log("Token being sent:", localStorage.getItem('token'));

        axios.get(`http://localhost:8080/my-blogs?email=${encodeURIComponent(gmail)}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            
        })
        .then(res => { 
            if (res.data && res.data.length > 0) {
                setcontent(res.data);
                seterror('');
            } else {
                setcontent([]);
                seterror("There are no blogs to display");
            }
            setloading(false);
        })
        .catch(err => {
            console.error(err);
            seterror("Error fetching Blogs");
            setloading(false);
        });

    }, [gmail]);

    return (
        <div className="MyBlogContainer">
            <h1>My Blogs</h1>

            {loading ? (
                <p>Loading your blogs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="blogsGrid">
                    {content.map(blog => (
                        <div key={blog.id} className="blogCard">
                            <img src={blog.coverImageUrl} alt={blog.title} className="blogImage" />
                            <h2>{blog.title}</h2>
                            <p>{blog.content.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBlog;
