package com.ssafy.cocoshop.utils.members.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MemberRatingUpdateRequestDto {
	private String userId;
	private Integer amount;
}
