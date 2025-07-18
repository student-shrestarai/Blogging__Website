import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserFromToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const user = getUserFromToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get(`http://localhost:8080/home/my-blogs?email=${user.email}`)
            .then(res => setBlogs(res.data))
            .catch(err => console.error("Error fetching my blogs:", err));
    }, [user, navigate]);

    return (
        <div className="myBlogsContainer">
            <h1>My Blogs</h1>
            {blogs.length === 0 ? (
                <p>You have not authored any blogs yet.</p>
            ) : (
                blogs.map(blog => (
                    <div
                        key={blog.id}
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        className="blogCard"
                    >
                        <h2>{blog.title}</h2>
                        <img src={blog.coverImageUrl} alt={blog.title} />
                        <p>{blog.content.substring(0, 100)}...</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyBlogs;
