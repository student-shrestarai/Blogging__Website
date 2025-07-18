package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Repository.UserRepository;
import com.example.blog.Entity.Registration;

@Service
public class UserService {

    @Autowired
    private  UserRepository user_repo;

     @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Registration saveuser( Registration newuser){

        String hashedPassword = passwordEncoder.encode(newuser.getPassword());
        newuser.setPassword(hashedPassword);
        return this.user_repo.save(newuser);
    }

    public Iterable<Registration> getuser(){
        return this.user_repo.findAll();
    }

      
    public Registration getbyId(Integer id) {
        return this.user_repo.findById(id).orElse(null);
    }



    public void deleteuser(Integer id) {

        this.user_repo.deleteById(id);

    }


    public Registration updateuser(Integer id , Registration updateduser) {
       
        updateduser.setId(id);
        return this.user_repo.save(updateduser);
    }






    



    
}
