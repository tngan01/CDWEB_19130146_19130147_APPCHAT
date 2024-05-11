package com.cdweb.chatapp.dto;

import lombok.Data;

@Data
public class PinMessageRequest {
    private long roomId;
    private long messageId;
}
