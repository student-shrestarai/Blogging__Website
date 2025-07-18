package com.example.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.example.blog.Repository.UserRepository;

import java.io.IOException;
import java.util.Collections;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.blog.Entity.Registration;

import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

     @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String userEmail = null;

        // Extract token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userEmail = jwtUtil.extractEmail(token);
        }

        // Authenticate user
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<Registration> userDetails = userRepo.findByEmail(userEmail);

            if (userDetails.isPresent() && jwtUtil.validateToken(token, userEmail)) {

              String role = jwtUtil.extractRole(token);
              SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);
            //   SimpleGrantedAuthority authority = new SimpleGrantedAuthority( role);


                UsernamePasswordAuthenticationToken authToken;
                authToken = new UsernamePasswordAuthenticationToken(userDetails.get(), null, Collections.singleton(authority));
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);  
}




@Override
 protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.equals("/Registration") || path.equals("/Login");
    }



}
