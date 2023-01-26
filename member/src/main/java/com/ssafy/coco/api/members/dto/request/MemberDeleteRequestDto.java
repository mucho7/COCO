package com.ssafy.coco.api.members.dto.request;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberDeleteRequestDto {
	private LocalDateTime time;

	@Builder
	public MemberDeleteRequestDto(LocalDateTime time) {
		this.time = time;
	}

}
