package com.cdweb.chatapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ChatAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatAppApplication.class, args);
    }

//    @Bean
//    public WebMvcConfigurer corsConfig(){
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("ht")
//            }
//        }
//    }

}
