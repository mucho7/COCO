package com.ssafy.coco.api.members.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberUpdateRequestDto {
	private String password;
	private String name;
	private String email;

	@Builder
	public MemberUpdateRequestDto(String password, String name, String email) {
		this.password = password;
		this.name = name;
		this.email = email;
	}
}
