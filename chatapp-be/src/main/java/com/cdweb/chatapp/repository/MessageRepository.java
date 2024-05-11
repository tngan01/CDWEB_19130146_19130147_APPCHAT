package com.cdweb.chatapp.repository;

import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE m.room = ?1 AND m.content LIKE %?2%")
    public List<Message> findMessageByContentContain(Room room, String sub);
}
