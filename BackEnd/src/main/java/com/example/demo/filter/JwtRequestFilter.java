package com.example.demo.filter;

import com.example.demo.util.JwtUtil;
import com.example.demo.model.User;
import com.example.demo.repository.IUserRepository;
import com.example.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private IUserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        logger.info("HTTP method: "+request.getMethod());
        logger.info("Url: "+request.getRequestURI());
        logger.info("Start get header");
        String authHeader = request.getHeader("Authorization");
        logger.info("Authorization: "+authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            logger.info("End get header");
            String jwt = authHeader.substring(7);
            String username = jwtUtil.extractUsername(jwt);
            logger.info("Start get bearer");

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                Optional<User> optionalUser = userRepository.findByUsername(username);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    if (jwtUtil.validateToken(jwt, user)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);

                        // Lấy danh sách các vai trò (role) từ UserDetails
                        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

                        // In ra các vai trò (role) của người dùng
                        System.out.println("User Roles: ");
                        for (GrantedAuthority authority : authorities) {
                            System.out.println(authority.getAuthority());  // In từng role của người dùng
                        }
                    }
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
