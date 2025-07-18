



import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./WriteBlog.css";
import { getUserFromToken } from "../getUserFromToken";


const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [blog, setBlog] = useState("");

  const user = getUserFromToken()
  const email_add = user.email
  const[email , setemail] = useState(email_add)

  const quillRef = useRef(null);

  // Inline image upload handler for ReactQuill toolbar image button
  // const imageHandler = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("image", file);

  //       try {
  //         // Upload image to your backend
  //         const res = await axios.post("http://localhost:8080/upload-image", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         const imageUrl = `http://localhost:8080${res.data.url}`;
  //         const quill = quillRef.current.getEditor();
  //         const range = quill.getSelection(true);
  //         quill.insertEmbed(range.index, "image", imageUrl);
  //         quill.setSelection(range.index + 1);
  //       } catch (err) {
  //         alert("Failed to upload image");
  //       }
  //     }
  //   };
  // };



  const imageHandler = () => {
  const editor = quillRef.current?.getEditor();
  if (!editor) {
    console.error("Quill editor not ready yet.");
    return;
  }

  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          "http://localhost:8080/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const imageUrl = `http://localhost:8080${res.data.url}`;
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, "image", imageUrl);
          editor.setSelection(range.index + 1);
        }
      } catch (err) {
        alert("Failed to upload image");
      }
    }
  };
};


  // ReactQuill modules with custom image handler
  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ header: [1, 2, false] }],
  //       ["bold", "italic", "underline", "strike"],
  //       ["image", "code-block"],
  //     ],
  //     handlers: {
  //       image: imageHandler,
  //     },
  //   },
  // };

  // Handle cover image change and upload immediately








const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["image", "code-block"],
  ],
};











  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    setCoverImage(file);

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("http://localhost:8080/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        setCoverImageUrl(`http://localhost:8080${res.data.url}`);
      } catch (err) {
         console.error(err);
        alert("Failed to upload cover image");
        console.log(err)
      }
    }
  };

  // Handle form submit - you can send this data to your backend API here
  const handleSubmit = async(e) => {
    e.preventDefault();

    const blogPostData = {
      title,
      coverImageUrl,
      author,
      content: blog,
      email
    };

    try{

   console.log("Blog Post Data Sent:", blogPostData);

   const resposne = await axios.post(`http://localhost:8080/home`, blogPostData, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
console.log("Blog Post Data:", resposne.data);
    alert("Blog Data Posted Sucessfully" );
  

    }
    catch(err){
      console.log(err.data);
      alert("Could not publis blog");
    }
    finally{
      setTitle("")
      setCoverImage(null)
      setAuthor("")
      setBlog("")
    }
  

    // TODO: Send blogPostData to backend API to save blog post
  };

  return (
  
    <div className="blogContainer" >
      <h2>Write your blog here</h2>
      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          value={title}
          name="title"
          placeholder="Enter your title"
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Enter your title"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        

        <input
          type="text"
          value={author}
          name="author"
          placeholder="Author name"
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>
          Cover Image (upload one):
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            required
            style={{ display: "block", marginTop: "5px" }}
          />
        </label>

        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Cover"
            style={{ width: "200px", marginTop: "10px", display: "block" }}
          />
        )}

        <ReactQuill
          ref={quillRef}
          value={blog}
          // onChange={setBlog}
          onChange={(content) => setBlog(content)}
          modules={modules}
          placeholder="Write your blog content here..."
          style={{ height: "800px", marginTop: "20px" }}
        />

        <button
          type="submit"
         
        >
          PUBLISH
        </button>
      </form>
    </div>
    
  );
};

export default WriteBlog;

