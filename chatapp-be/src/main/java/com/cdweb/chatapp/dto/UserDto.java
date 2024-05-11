package com.cdweb.chatapp.dto;

import com.cdweb.chatapp.model.AddFriendRequest;
import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Data
public class UserDto {
    private String email;
    private String name;
    private Date birthday;
    private String phone;

    private String address;
    private String avatarUrl;
    private String desc;
    private String token;
    private String role;
    private String verificationCode;
    private boolean enable;


    private Set<Message> messages;

    private Set<Room> room;

    private Set<AddFriendRequest> addFriendRequestSender;

    private Set<AddFriendRequest> addFriendRequestReceiver;

    private Set<Room> rooms = new HashSet<>();

    public void addRoom(Room r) {
        this.rooms.add(r);
    }
}
