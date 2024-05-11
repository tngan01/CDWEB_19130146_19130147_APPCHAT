package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.AddFriendReqDto;
import com.cdweb.chatapp.dto.LoginRequest;
import com.cdweb.chatapp.dto.UserDto;
import com.cdweb.chatapp.dto.UserUpdateRequest;
import com.cdweb.chatapp.model.AddFriendRequest;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.AddFriendRequestService;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.UserService;
import com.sun.mail.iap.Response;
import com.sun.mail.iap.ResponseHandler;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chatapp.api")
public class UserController {
    private final ModelMapper mapper = new ModelMapper();
    @Autowired
    private UserService userService;
    @Autowired
    private AddFriendRequestService friendRequestService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/auth")
    public String authAndGetToken(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token;
        if (authentication.isAuthenticated()) {
            token = jwtService.generateToken(loginRequest.getUsername());
            return token;

        } else throw new UsernameNotFoundException("invalid user request!");
//        String jwt = jwtProvider.generateJwtToken(authentication);

    }

    @PostMapping("/register")
    public ResponseEntity<String> addNewUser(@RequestBody User newUser, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        boolean ckeckAccount = userService.register(newUser, getSiteURL(request));
        if (ckeckAccount)
            return ResponseEntity.ok("Thông tin hợp lệ, hãy xác thực trong email của bạn để hoàn tất!");
        return ResponseEntity.badRequest().body("Email này đã được đăng ký");
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

//    =====================================================================================================

    @GetMapping("/user")
    public String helloUser(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    @GetMapping("/hello")
    public String helloPage() {
        System.out.println("hâhaa");
        return "hello";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{username}")
    public UserDto getUser(@PathVariable String username) {
        return mapper.map(userService.findByEmail(username), UserDto.class);
    }

    @GetMapping("/users/me")
    public UserDto myProfile(@RequestHeader("Authorization") String bearerToken) {
        String username = jwtService.extractUsername(bearerToken.substring(7));

        return mapper.map(userService.findByEmail(username), UserDto.class);
    }

    @PutMapping("/users/me/update")
    public void updateProfile(@RequestHeader("Authorization") String bearerToken, @RequestBody UserUpdateRequest userUpdateRequest) {
        String username = jwtService.extractUsername(bearerToken.substring(7));
        User user = userService.findByEmail(jwtService.extractUsername(bearerToken.substring(7)));
        user.setName(userUpdateRequest.getName());
        user.setAvatarUrl(userUpdateRequest.getAvatarUrl());
        user.setAddress(userUpdateRequest.getAddress());
        user.setDesc(userUpdateRequest.getDesc());
        user.setPhone(userUpdateRequest.getPhone());

            userService.save(user);

    }
}


