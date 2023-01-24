package com.ssafy.coco.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomUpdateRequestDto {
	private String title;
	private String content;
	private String mode;
	private Integer isLive;
	private Integer numberUsers;
	private Integer max;

	@Builder
	public RoomUpdateRequestDto(String title, String content, String mode, Integer isLive, Integer numberUsers,
		Integer max) {
		this.title = title;
		this.content = content;
		this.mode = mode;
		this.isLive = isLive;
		this.numberUsers = numberUsers;
		this.max = max;
	}
}
