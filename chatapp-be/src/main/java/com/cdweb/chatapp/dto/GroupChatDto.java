package com.cdweb.chatapp.dto;

import lombok.Data;

@Data
public class GroupChatDto {
    private long id;
    private String name;
    private String[] members;
}
