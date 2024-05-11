package com.cdweb.chatapp.repository;

import com.cdweb.chatapp.model.AddFriendRequest;
import com.cdweb.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddFriendRequestRepository extends JpaRepository<AddFriendRequest, Long> {
    @Query("SELECT u FROM AddFriendRequest u WHERE u.receiver = ?1")
    public List<AddFriendRequest> getMyAddFriendRequest(User receiver);
}
