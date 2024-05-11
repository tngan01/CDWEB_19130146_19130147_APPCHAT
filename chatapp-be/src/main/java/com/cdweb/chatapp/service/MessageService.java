package com.cdweb.chatapp.service;

import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.repository.MessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private RoomService roomService;

    private final ModelMapper mapper= new ModelMapper();

    public List<Message> loadMessages( long id){
        Room room = roomService.findById(id);
//        return room.getMessages();
        return null;
    }

    public Message findById(long id){
      return  messageRepository.findById(id).get();
    }

    public List<Message> findMessageByContentContain(Room room, String content){
        return messageRepository.findMessageByContentContain(room, content);
    }


    public void save(Message message) {
        messageRepository.save(message);
    }
}
