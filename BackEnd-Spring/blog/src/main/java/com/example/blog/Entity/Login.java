package com.example.blog.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Login {

    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer Id;  
    
    @Column(nullable = false , unique = true)
    private String email;


    @Column(nullable = false )
    private String password;


public String getPassword(){
    return this.password ;

}

public String getEmail(){
    return this.email;

}



}
