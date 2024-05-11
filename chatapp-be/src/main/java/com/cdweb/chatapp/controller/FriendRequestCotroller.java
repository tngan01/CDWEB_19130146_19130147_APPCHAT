package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.AddFriendReqDto;
import com.cdweb.chatapp.dto.IdDto;
import com.cdweb.chatapp.model.AddFriendRequest;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.AddFriendRequestService;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.RoomService;
import com.cdweb.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/chatapp.api")
public class FriendRequestCotroller {
    @Autowired
    private UserService userService;
    @Autowired
    private AddFriendRequestService friendRequestService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private RoomService roomService;

    @GetMapping("/addFriendReq/myRequest")
    public List<AddFriendRequest> getMyAddFriendRequest(@RequestHeader("Authorization") String bearerToken) {
        String username = jwtService.extractUsername(bearerToken.substring(7));
        User receiver = userService.findByEmail(username);

        ArrayList<AddFriendRequest> requests = new ArrayList<>(friendRequestService.getMyAddFriendRequest(receiver));
        return requests;

    }

    @PostMapping("/addFriend")
    public void addFriendRequest(@RequestHeader("Authorization") String bearerToken, @RequestBody AddFriendReqDto addFriendReqDto) {

        String username = jwtService.extractUsername(bearerToken.substring(7));

        User sender = userService.findByEmail(username);
        User receiver = userService.findByEmail(addFriendReqDto.getReceiver());

        AddFriendRequest addFriendRequest = new AddFriendRequest();
        addFriendRequest.setSender(sender);
        addFriendRequest.setReceiver(receiver);
        addFriendRequest.setSendAt(LocalDateTime.now());

        friendRequestService.sendRequest(addFriendRequest);
    }

    @PostMapping("/acceptFriend")
    public void acceptAddFriendRequest(@RequestBody IdDto idDto) {
        System.out.println("haha");
        System.out.println(idDto.getId());
        AddFriendRequest friendRequest = friendRequestService.findById(idDto.getId());

        Room newRoom = new Room();
        newRoom.addMember(friendRequest.getSender());
        newRoom.addMember(friendRequest.getReceiver());
//        newRoom.setName(friendRequest.getSender().getName()+friendRequest.getReceiver().getName());
        newRoom.setCreateAt(LocalDateTime.now());
        newRoom.setUpdateAt(LocalDateTime.now());

        friendRequest.getSender().addRoom(newRoom);
        friendRequest.getReceiver().addRoom(newRoom);

        roomService.createNewRoom(newRoom);
        friendRequestService.deleteRequest(idDto.getId());
    }

    @DeleteMapping("/addFriendRequests/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        friendRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
