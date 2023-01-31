package com.ssafy.coco.api.members.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberUpdateRequestDto {
	private String name;
	private String email;

	@Builder
	public MemberUpdateRequestDto(String password, String name, String email) {
		this.name = name;
		this.email = email;
	}
}
