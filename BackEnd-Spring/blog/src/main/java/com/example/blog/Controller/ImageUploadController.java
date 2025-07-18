package com.example.blog.Controller;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.nio.file.Path;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin(origins = "http://localhost:3000")


public class ImageUploadController {


    
 @PostMapping("/upload-image")
public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
    try {
        // 1. Create a directory path object to the folder where images will be stored
        Path uploadPath = Paths.get("uploads/");
        
        // 2. Check if the folder exists, if not, create it
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 3. Generate a unique file name for the uploaded file, e.g. timestamp + original filename
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // 4. Create the full path where the file will be saved
        Path filePath = uploadPath.resolve(filename);

        // 5. Copy the uploaded file's content to the destination file on disk
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 6. Prepare the URL string that the frontend can use to load the image
        String url = "/uploads/" + filename;

        // 7. Return HTTP 200 OK response with JSON containing the URL of the uploaded image
        return ResponseEntity.ok().body(Map.of("url", url));

    } catch (Exception e) {
        // If anything goes wrong, return HTTP 500 Internal Server Error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file");
    }
}

    
}
