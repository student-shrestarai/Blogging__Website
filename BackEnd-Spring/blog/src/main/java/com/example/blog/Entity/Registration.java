package com.example.blog.Entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.Id;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Registration{

   

    public enum Role {
        ADMIN, EDITOR , USER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer Id;

    @NotBlank(message = "Full name cannot be empty")
    private String fullName ;

    @Column(nullable = false , unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;



    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime  createdAt;




    public void setFullName(String fullName) {
        this.fullName = (fullName != null) ? fullName.trim() : null;
    }

     public String getFullName() {
        return fullName;
    }



    public String getEmail(){
        return this.email;
    }

  

    public void setPassword(String  password){
        this.password = password;
    }

    public String getPassword(){
        return this.password ;
    
    }

    
    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

  
 

}