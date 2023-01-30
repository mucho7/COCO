package com.ssafy.coco.api.members.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRatingUpdateRequestDto {
	private String userId;
	private Integer amount;

	@Builder
	public MemberRatingUpdateRequestDto(String userId, Integer amount) {
		this.userId = userId;
		this.amount = amount;
	}

}
