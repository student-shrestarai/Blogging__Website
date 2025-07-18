package com.example.blog.Repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.example.blog.Entity.Registration;

public interface UserRepository extends CrudRepository <Registration, Integer>

 {

    Optional<Registration>findByEmail(String email);




    
}
