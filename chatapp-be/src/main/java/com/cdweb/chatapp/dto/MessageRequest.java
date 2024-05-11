package com.cdweb.chatapp.dto;

import lombok.Data;

@Data
public class MessageRequest {
    private String sender;
    private String receiver ;
    private String content;
    private String messageType;
    private long roomId;
    private long replyId;
}
