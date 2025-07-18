import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditBlog.css'; // optional styling

const EditBlog = () => {
    const { id } = useParams(); // get the blog id from URL
    const navigate = useNavigate();

    const [blogData, setBlogData] = useState({
        title: '',
        coverImageUrl: '',
        content: '',
        author: '',
        email: ''
    });

    // Fetch the existing blog data when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:8080/home/${id}` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setBlogData(res.data);
            })
            .catch(err => {
                console.error('Error fetching blog:', err);
                alert('Error fetching blog details.');
            });
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission to update the blog
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/home/${id}`, blogData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                alert('Blog updated successfully!');
                navigate('/view-blogs'); // adjust based on your routing
            })
            .catch(err => {
                console.error('Error updating blog:', err);
                alert('Failed to update blog. You may not have permission.');
            });
    };

    return (
        <div className="editContainer">
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit} className="editForm">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={blogData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="coverImageUrl"
                    placeholder="Cover Image URL"
                    value={blogData.coverImageUrl}
                    onChange={handleChange}
                    required
                />
               {blogData.coverImageUrl && (
    <img 
        src={blogData.coverImageUrl} 
        alt="Cover Preview" 
        className='coverImage'
    />
)}
                <textarea
                    name="content"
                    placeholder="Content"
                    value={blogData.content}
                    onChange={handleChange}
                    rows={8}
                    className='mainContent'
                    required

                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={blogData.author}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Author Email"
                    value={blogData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;
