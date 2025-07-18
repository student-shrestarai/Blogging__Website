package com.example.blog.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.Blog;

import com.example.blog.Repository.BlogRepository;

@Service
public class BlogService {
    @Autowired

private BlogRepository blog_repo ;


public Blog save_blog(Blog blog) {
    return this.blog_repo.save(blog);
}



public Iterable<Blog> get_blog(){
    return this .blog_repo.findAll();
}


public Blog getById(Integer id)
{
    return this.blog_repo.findById(id).orElse(null);
}

public void delete_blog(Integer id)
{
    this.blog_repo.deleteById(id);
}



public Blog update_blog (Integer id , Blog updated_blog){
    updated_blog.setId(id);
    return this.blog_repo.save(updated_blog);
}

public List<Blog> getBlogsByEmail(String email) {
    return blog_repo.findByEmail(email);
}





    
}
