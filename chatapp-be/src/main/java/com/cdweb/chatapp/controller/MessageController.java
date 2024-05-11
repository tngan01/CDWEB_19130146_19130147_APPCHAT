package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.PinMessageRequest;
import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.service.MessageService;
import com.cdweb.chatapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.geom.GeneralPath;
import java.util.List;

@RestController
@RequestMapping("/chatapp.api")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private RoomService roomService;

    @PutMapping("/rooms/{roomId}/messages/{messageId}/pin")
    public String pinMessage(@PathVariable long messageId,@PathVariable long roomId){
       Message m = messageService.findById(messageId);
       Room r = roomService.findById(roomId);

       if(r.getCountPin()==10) return "Pin messages is maximum!";
       m.setPin(true);
       r.setCountPin(r.getCountPin()+1);

       messageService.save(m);
       roomService.createNewRoom(r);
       return "This message is pin!";

    }

    @PutMapping("/rooms/{roomId}/messages/{messageId}/unpin")
    public String unpinMessage(@PathVariable long messageId,@PathVariable long roomId){
        Message m = messageService.findById(messageId);
        Room r = roomService.findById(roomId);

        m.setPin(false);
        r.setCountPin(r.getCountPin()-1);

        messageService.save(m);
        roomService.createNewRoom(r);
        return "This message is unpin!";

    }

}
