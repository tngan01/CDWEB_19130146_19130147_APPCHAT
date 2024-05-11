package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "add_friend_request")
public class AddFriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
   @ManyToOne
    private User sender;
    @ManyToOne
    private User receiver;
    @Column
    private LocalDateTime sendAt;


}
