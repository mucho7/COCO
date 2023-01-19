package com.ssafy.coco.data;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Room {
    @Id
    private String roomId;
    private String hostId;

    @Builder
    public Room(String roomId, String hostId){
        this.roomId = roomId;
        this.hostId = hostId;
    }
}
