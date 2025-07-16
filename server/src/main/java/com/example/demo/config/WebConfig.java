package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // applies to all paths
                .allowedOrigins("http://localhost:3000") // allow frontend origin
                .allowedMethods("*") // allow all HTTP methods (POST, GET, etc.)
                .allowedHeaders("*");
    }
}
