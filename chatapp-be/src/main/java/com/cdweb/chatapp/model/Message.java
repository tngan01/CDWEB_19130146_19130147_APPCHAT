package com.cdweb.chatapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne()
    private User sender;
    @ManyToOne()
    @JsonIgnore
    private Room room;
//    @Enumerated(EnumType.STRING)
    private String messageType;
    @Column
    private LocalDateTime sendAt;
    @Column
    private boolean isPin=false;
    @Lob
    @Column()
    private String content;

    @Column()
    private Long replyId;
    @ManyToMany(mappedBy = "likes")
    @JsonIgnore
    private Set<User> likes= new HashSet<>();
    @ManyToMany(mappedBy = "dislikes")
    @JsonIgnore
    private Set<User> dislikes= new HashSet<>();





}
