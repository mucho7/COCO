package com.ssafy.coco.api.dto.request;

import com.ssafy.coco.data.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRegisterRequestDto {
	private String id;
	private String password;
	private String name;
	private String email;

	@Builder
	public MemberRegisterRequestDto(String id, String password, String name, String email) {
		this.id = id;
		this.password = password;
		this.name = name;
		this.email = email;
	}

	public Member toEntity() {
		return Member.builder()
			.id(id)
			.password(password)
			.name(name)
			.email(email)
			.build();
	}
}
