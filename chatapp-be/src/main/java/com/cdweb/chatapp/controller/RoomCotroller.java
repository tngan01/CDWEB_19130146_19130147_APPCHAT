package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.GroupChatDto;
import com.cdweb.chatapp.dto.PinMessageRequest;
import com.cdweb.chatapp.dto.RoomDto;
import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.MessageService;
import com.cdweb.chatapp.service.RoomService;
import com.cdweb.chatapp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/chatapp.api")
public class RoomCotroller {

    @Autowired
    private RoomService roomService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private MessageService messageService;

    private final ModelMapper mapper= new ModelMapper();

    Comparator<Message> comparator = new Comparator<Message> () {
        @Override
        public int compare (final Message o1, final Message o2) {
            if (o1.getSendAt () == null || o2.getSendAt () == null)
                return 0;
            return o1.getSendAt ().compareTo (o2.getSendAt ());
        }
    };



    @GetMapping("/rooms")
    public List<RoomDto> getAllMyRooms(@RequestHeader("Authorization") String bearerToken) {
        String username = jwtService.extractUsername(bearerToken.substring(7));
        ArrayList<RoomDto> result = roomService.getAllMyRooms(username);

        for (RoomDto r : result
        ) {
            System.out.println(r.getId()+"-"+r.getMembers().size());
            for (User u: r.getMembers()
                 ) {
                System.out.println(u.getEmail());
            }
        }

        return result;

    }


    @PostMapping("/room/member")
    public void addMemberGroup(@RequestHeader("Authorization") String bearerToken, @RequestBody GroupChatDto groupChatDto) {
        Room room = roomService.findById(groupChatDto.getId());
        room.setUpdateAt(LocalDateTime.now());

        String[] mems = groupChatDto.getMembers();
        if (mems.length == 0) return;
        for (String email : mems
        ) {
            User user = userService.findByEmail(email);
            user.addRoom(room);
            room.addMember(user);
        }

        roomService.createNewRoom(room);
    }

    @PostMapping("/room")
    public void createGroupChat(@RequestHeader("Authorization") String bearerToken, @RequestBody GroupChatDto groupChatDto) {
        Room room = new Room();
        room.setName(groupChatDto.getName());
        room.setGroup(true);
        room.setCreateAt(LocalDateTime.now());
        room.setUpdateAt(LocalDateTime.now());

        String username = jwtService.extractUsername(bearerToken.substring(7));
        User creator = userService.findByEmail(username);
        room.setAdmin(creator);
        creator.addRoom(room);
        room.addMember(creator);

        String[] mems = groupChatDto.getMembers();

        for (String email : mems
        ) {
            User user = userService.findByEmail(email);
            user.addRoom(room);
            room.addMember(user);
        }

        roomService.createNewRoom(room);

    }

    @GetMapping("/rooms/{id}/members")
    public List<Room> getMembersInRoom(@PathVariable long id) {
        return (List) roomService.getMembersInRoom(id);

    }



    @GetMapping("/rooms/{roomId}/{content}")
    public List<Message> findMessageByContentContain(@PathVariable long roomId, @PathVariable String content){
      Room room = roomService.findById(roomId);
      System.out.println(roomId + content);
      return messageService.findMessageByContentContain(room, content);
    }

    @GetMapping("/rooms/{roomId}/messages")
    public List<Message> getMessages(@PathVariable long roomId){

        List messages= roomService.getMessages(roomId);
        Collections.sort (messages, comparator);
        return messages;
    }

    @DeleteMapping("/rooms/{roomId}/{username}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long roomId,@PathVariable String username) {
        roomService.deleteMember(roomId, username);
        return ResponseEntity.noContent().build();
    }
}
