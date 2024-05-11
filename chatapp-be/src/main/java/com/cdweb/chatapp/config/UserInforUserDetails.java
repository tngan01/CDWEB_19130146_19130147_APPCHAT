package com.cdweb.chatapp.config;

import com.cdweb.chatapp.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class UserInforUserDetails implements UserDetails {

    private String username;
    private String password;
    private String email;

    public String getEmail() {
        return email;
    }

    private List<GrantedAuthority> authorities;

    public UserInforUserDetails(User user) {
        username=user.getEmail();
        password=user.getPassword();
     //   email = user.getEmail();
        authorities= Arrays.stream(user.getRole().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
