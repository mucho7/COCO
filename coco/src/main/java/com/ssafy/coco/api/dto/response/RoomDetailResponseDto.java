package com.ssafy.coco.api.dto.response;

import com.ssafy.coco.data.Room;

import lombok.Getter;

@Getter
public class RoomDetailResponseDto {
	private String roomId;
	private String hostId;
	private String title;
	private String content;
	private Integer hostRating;
	private String mode;
	private Integer numberUsers;
	private Integer max;

	public RoomDetailResponseDto(Room entity) {
		this.roomId = entity.getRoomId();
		this.hostId = entity.getHostId();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.hostRating = entity.getHostRating();
		this.mode = entity.getMode();
		this.numberUsers = entity.getNumberUsers();
		this.max = entity.getMax();
	}
}
