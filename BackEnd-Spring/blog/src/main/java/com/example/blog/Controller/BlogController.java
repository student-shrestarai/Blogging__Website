package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.example.blog.Entity.Blog;
import com.example.blog.Service.BlogService;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")



public class BlogController {
   
@Autowired
private BlogService blog_service ;

// @PostMapping
// public ResponseEntity<?> saveblog(@RequestBody Blog blog)

// {
//     this.blog_service.save_blog(blog);
//     return ResponseEntity.ok("Blog added Successfully");
// }


@PostMapping
public ResponseEntity<?> saveblog(@RequestBody Blog blog) {
    try {
        this.blog_service.save_blog(blog);
        return ResponseEntity.ok("Blog added Successfully");
    } catch (Exception e) {
        e.printStackTrace(); // shows stack in console
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error saving blog: " + e.getMessage());
    }
}


@GetMapping
 public ResponseEntity<?> getBlogs() {
     return ResponseEntity.ok(this.blog_service.get_blog());
 }



// GET: Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
    Blog blog = this.blog_service.getById(id);
        if (blog== null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with ID " + id + " does not exist");
        }
        return ResponseEntity.ok(blog);
    }

    // DELETE: Delete User
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @blogSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        Blog blog = this.blog_service.getById(id);
        if (blog == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with ID " + id + " does not exist");
        }
        this.blog_service. delete_blog(id);
        return ResponseEntity.ok("Blog" + id + " deleted successfully");
    }

    // PUT: Update User
    @PutMapping("/{id}")
   @PreAuthorize("hasRole('ADMIN') or hasRole('EDITOR') or @blogSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Blog updated_blog)
     {
        Blog blog = this.blog_service.getById(id);
        if (blog == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Blog  with ID " + id + " does not exist");
        }
        Blog updated = this.blog_service.update_blog (id, updated_blog);
        return ResponseEntity.ok(updated);
    }


    @GetMapping("/my-blogs")
public ResponseEntity<?> getMyBlogs(@RequestParam String email) {
    List<Blog> myBlogs = this.blog_service.getBlogsByEmail(email);
    return ResponseEntity.ok(myBlogs);
}






    
}
