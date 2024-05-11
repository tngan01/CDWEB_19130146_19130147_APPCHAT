package com.cdweb.chatapp.dto;

import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Data
public class RoomDto {
    private long id;
    private String name;
    private boolean isGroup;
    private User admin;
    private LocalDateTime createAt ;
    private LocalDateTime updateAt;
    private Message pinMessage;
    private Set<User> members= new HashSet<>();
    private Set<Message> messages= new HashSet<>();

    private int countPin;
    public void addMember(User u){
        this.members.add(u);
    }
    public void addAllMember(Set<User> users){
        this.members.addAll(users);
    }
}
