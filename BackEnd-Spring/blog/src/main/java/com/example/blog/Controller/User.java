package com.example.blog.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.Repository.UserRepository;
import com.example.blog.Service.UserService;
import com.example.blog.Entity.Registration;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/Registration")

public class User {

    @Autowired
    private UserService user_service;


    @Autowired
    private UserRepository user_repo;

@PostMapping
public ResponseEntity<?> addUser (@RequestBody Registration newUser){

   String gmail = newUser.getEmail();

    Optional<Registration> user_reg = user_repo.findByEmail(gmail);

    
if(!user_reg.isPresent()) {
    this.user_service.saveuser(newUser);
    return ResponseEntity.ok("User added Successfully");
}
else
{
    return ResponseEntity.badRequest().body("User already Exists");
}
}



 // GET: Get All Users
 @GetMapping
 public ResponseEntity<?> getUsers() {
     return ResponseEntity.ok(this.user_service.getuser());
 }



// GET: Get User by ID


    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        Registration foundUser = this.user_service.getbyId(id);
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with ID " + id + " does not exist");
        }
        return ResponseEntity.ok(foundUser);
    }

    // DELETE: Delete User

    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        Registration foundUser = this.user_service.getbyId(id);
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with ID " + id + " does not exist");
        }
        this.user_service.deleteuser(id);
        return ResponseEntity.ok("User with ID " + id + " deleted successfully");
    }

    // PUT: Update User
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #updatedUser.email == authentication.name")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Registration updatedUser)
     {
        Registration  foundUser = this.user_service.getbyId(id);
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with ID " + id + " does not exist");
        }
        Registration updated = this.user_service.updateuser(id, updatedUser);
        return ResponseEntity.ok(updated);
    }








    
    
    
}
