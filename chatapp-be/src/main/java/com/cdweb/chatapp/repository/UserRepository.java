package com.cdweb.chatapp.repository;

import com.cdweb.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "SELECT u FROM User u where u.email = ?1 and u.password = ?2 ")
    Optional login(String email, String password);

    Optional findByToken(String token);

    Optional<User> findByEmail(String email);

    Optional<User> findById(String id);
    @Query("SELECT u.name FROM User u WHERE u.email = ?1")
    String findNameByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    User findByVerificationCode(String code);
}
