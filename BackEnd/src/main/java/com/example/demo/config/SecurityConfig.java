package com.example.demo.config;

import com.example.demo.filter.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@Component
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for simplicity in token-based auth
                .cors(AbstractHttpConfigurer::disable) // Disable CORS
                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/**").permitAll()
//                        .requestMatchers("/test").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/test/admin").hasAuthority("Admin")
                        .requestMatchers("/test/customer").hasAuthority("Customer")
                        .requestMatchers("/test/whoami").permitAll()
                        .requestMatchers("/test","/swagger-ui/**","/v3/api-docs/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .requestMatchers("/orders/**").permitAll()
                        .requestMatchers("/users/**").permitAll()
                        .requestMatchers("/role/**").permitAll()
                        .requestMatchers("/payment/**").permitAll()
                        .requestMatchers("/service/**").permitAll()
                        .requestMatchers("/deliveryMethod/**").permitAll()
                        .requestMatchers("/koi-box/**").permitAll()
                        .requestMatchers("/dashboard/**").permitAll()
                        .requestMatchers("/otp/**").permitAll()
                        .anyRequest().denyAll()) // All other routes require authentication
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}