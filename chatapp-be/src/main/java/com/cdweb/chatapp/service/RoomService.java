package com.cdweb.chatapp.service;

import com.cdweb.chatapp.dto.RoomDto;
import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.repository.RoomRepository;
import com.cdweb.chatapp.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class RoomService {

    private final ModelMapper mapper = new ModelMapper();
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    public Room findById(long id) {
        return roomRepository.findById(id).get();
    }

    public void createNewRoom(Room room) {
        roomRepository.save(room);
    }

    public ArrayList<RoomDto> getAllMyRooms(String username) {
        ArrayList<Room> rooms = new ArrayList<>(userRepository.findByEmail(username).get().getRooms());
        ArrayList<RoomDto> roomDtos = new ArrayList<>();
        for (int i = 0; i < rooms.size(); i++) {
//          RoomDto roomDto=  mapper.map(rooms.get(i), RoomDto.class);
            roomDtos.add(mapper.map(rooms.get(i), RoomDto.class));
        }
        return roomDtos;
    }

    public List<User> getMembersInRoom(long id) {
        Room room = findById(id);
        return new ArrayList<>(room.getMembers());
    }

    public List<Message> getMessages(long roomId) {
        return new ArrayList<>(roomRepository.findById(roomId).get().getMessages());
    }

    public void deleteMember(Long roomId, String username) {
        User user = userRepository.findByEmail(username).get();
        user.deleteRoom(roomId);
        userRepository.save(user);

        Room room=roomRepository.findById(roomId).get();
        room.deleteMember(username);
        roomRepository.save(room);
    }
}
