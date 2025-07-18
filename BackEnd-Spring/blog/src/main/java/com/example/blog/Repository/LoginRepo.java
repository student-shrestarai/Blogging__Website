package com.example.blog.Repository;

import org.springframework.data.repository.CrudRepository;

import com.example.blog.Entity.Login;

public interface LoginRepo  extends CrudRepository<Login ,  Integer>{
    
}
