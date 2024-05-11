package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.Chat;
import com.cdweb.chatapp.dto.MessageRequest;
import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.service.MessageService;
import com.cdweb.chatapp.service.RoomService;
import com.cdweb.chatapp.service.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class WebsocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId, @Payload MessageRequest messageRequest) {
        System.out.println("Tin nhan" + messageRequest.getRoomId());

        Room room = roomService.findById(messageRequest.getRoomId());
        Message message = new Message();
        String messageType = messageRequest.getMessageType();
        try {
            if (messageType.equalsIgnoreCase("message") || messageType.equalsIgnoreCase("image") || messageType.equalsIgnoreCase("file") || messageType.equalsIgnoreCase("video")) {
                message.setSender(userService.findByEmail(messageRequest.getSender()));
                message.setMessageType(messageRequest.getMessageType());
                message.setRoom(room);
                message.setSendAt(LocalDateTime.now());
                message.setContent(messageRequest.getContent());
                message.setReplyId(messageRequest.getReplyId());


            }
        } catch (Exception e) {
            System.out.println();
        }
        messageService.save(message);
        room.addMessage(message);
        roomService.createNewRoom(room);
        System.out.println(message.getContent());
        return message;

    }

//    @MessageMapping("/sendMessage")
//    @SendTo("/room/public")
//    public Chat message(@Payload Chat chat) {
//        return chat;
//    }

}

