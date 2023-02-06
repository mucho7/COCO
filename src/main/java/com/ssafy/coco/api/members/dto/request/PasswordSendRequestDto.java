package com.ssafy.coco.api.members.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("임시 비밀번호 메일 요청 정보")
public class PasswordSendRequestDto {
	String userId;
	String email;
}
