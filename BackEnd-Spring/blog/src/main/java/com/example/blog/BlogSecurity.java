package com.example.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.blog.Entity.Blog;
import com.example.blog.Controller.BlogController;
import com.example.blog.Service.BlogService;


@Component("blogSecurity")
public class BlogSecurity {

@Autowired
private BlogController blogcontroller;

@Autowired
private BlogService blogservice ;

private Blog blog;

    public boolean isOwner(Integer blogId , String userEmail){
        Blog blog = blogservice.getById(blogId);
        return blog!=null && blog.getEmail().equals(userEmail);
    }

    
}
