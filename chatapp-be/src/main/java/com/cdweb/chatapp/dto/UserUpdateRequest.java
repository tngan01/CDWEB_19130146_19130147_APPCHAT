package com.cdweb.chatapp.dto;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name, avatarUrl,desc, address, phone;
    //
}
