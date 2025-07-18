package com.example.blog.Repository;

import org.springframework.data.repository.CrudRepository;

import com.example.blog.Entity.Blog;
import java.util.List;





public interface BlogRepository extends CrudRepository<Blog, Integer> {
    // You can add custom query methods here if needed
    List<Blog> findByEmail(String email);

}
