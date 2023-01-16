package com.ssafy.coco.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
