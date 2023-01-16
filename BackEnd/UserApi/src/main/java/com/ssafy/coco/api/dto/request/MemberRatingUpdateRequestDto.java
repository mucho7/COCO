package com.ssafy.coco.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRatingUpdateRequestDto {
	private String id;
	private Integer amount;

	@Builder
	public MemberRatingUpdateRequestDto(String id, Integer amount) {
		this.id = id;
		this.amount = amount;
	}

}
