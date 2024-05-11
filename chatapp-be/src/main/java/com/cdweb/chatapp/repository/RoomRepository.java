package com.cdweb.chatapp.repository;

import com.cdweb.chatapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
//    @Query("SELECT r FROM rooms_members r WHERE r.memberEmail = :email")
//    List<Long> findRoomMembersByEmail(@Param("email") String email);

//    @Query("SELECT o FROM Room o JOIN FETCH o.members i WHERE i.email = ?1")
//    public ArrayList<Room> getAllMyRooms(String email);

}
