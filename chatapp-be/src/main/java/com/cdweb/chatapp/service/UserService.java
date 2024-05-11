package com.cdweb.chatapp.service;

import com.cdweb.chatapp.dto.LoginRequest;
import com.cdweb.chatapp.dto.UserDto;
import com.cdweb.chatapp.repository.UserRepository;
import com.cdweb.chatapp.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import net.bytebuddy.utility.RandomString;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final ModelMapper mapper= new ModelMapper();

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;

    public void save(User user){
        userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return  userRepository.findByEmail(email).get();
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    private void senderVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toEmail = user.getEmail();
        System.out.println(toEmail);
        String fromEmail = "chatapp.cdweb@gmail.com";
        String senderName = "Chat App Admin";
        String subject = "Verify your registration";
        String content = "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromEmail, senderName);
        helper.setTo(toEmail);
        helper.setSubject(subject);

        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public boolean register(User newUser, String siteURL) throws MessagingException, UnsupportedEncodingException {
        Optional<User> exist = userRepository.findByEmail(newUser.getEmail());

        if (exist.isEmpty()) {

            BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();
            String pwEncoded = pwEncoder.encode(newUser.getPassword());
            newUser.setPassword(pwEncoded);
            String randomCode = RandomString.make(100);
            newUser.setVerificationCode(randomCode);
            newUser.setEnable(false);
            newUser.setRole("ROLE_USER");

            userRepository.save(newUser);
            senderVerificationEmail(newUser, siteURL);
            return true;

        }
        return false;

    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        if (user == null || user.isEnable()) return false;
        user.setVerificationCode(null);
        user.setEnable(true);
        userRepository.save(user);
        return true;
    }

    public boolean findAccount(LoginRequest loginRequest) {
        User u = findByEmail(loginRequest.getUsername());
        return u != null && loginRequest.getPassword().equals(u.getPassword());
    }

    public String findNameByEmail(String email){
        return userRepository.findNameByEmail(email);
    }

}
