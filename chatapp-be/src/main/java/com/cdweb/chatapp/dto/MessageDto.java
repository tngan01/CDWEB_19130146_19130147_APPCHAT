package com.cdweb.chatapp.dto;

import com.cdweb.chatapp.model.MessageType;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Data
public class MessageDto {
        private long id;
        private User sender;
        private Room room;
        private MessageType messageType;
        private LocalDateTime sendAt;
        private String content;
        private long replyId;
        private boolean isPin;

}
