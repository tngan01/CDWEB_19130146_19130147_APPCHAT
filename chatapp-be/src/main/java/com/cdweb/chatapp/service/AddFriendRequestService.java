package com.cdweb.chatapp.service;

import com.cdweb.chatapp.model.AddFriendRequest;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.repository.AddFriendRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddFriendRequestService {
    @Autowired
    private AddFriendRequestRepository addFriendRequestRepository;

    public AddFriendRequest findById(long id){
       return addFriendRequestRepository.findById(id).get();
    }

    public void sendRequest(AddFriendRequest friendRequest){
     addFriendRequestRepository.save(friendRequest);
    }

    public void deleteRequest(long id){
        addFriendRequestRepository.deleteById(id);
    }

    public List<AddFriendRequest> getMyAddFriendRequest(User receiver){
        return addFriendRequestRepository.getMyAddFriendRequest(receiver);
    }
}
