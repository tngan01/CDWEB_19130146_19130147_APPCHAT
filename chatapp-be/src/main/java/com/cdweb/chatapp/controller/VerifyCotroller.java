package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VerifyCotroller {
    @Autowired
    private UserService userService;
    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code, HttpServletResponse httpServletResponse) throws IOException {
        if (userService.verify(code)) {
            httpServletResponse.sendRedirect("http://localhost:8080/login");
            return "verify success";
        }
        return "verify false";
    }
}
