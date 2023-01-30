package com.ssafy.coco.api.members.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@ApiModel("사용자 로그인 요청 응답 객체")
@NoArgsConstructor
public class MemberLoginResponseDto {

	@ApiModelProperty(name = "응답 코드")
	Integer statusCode = null;

	@ApiModelProperty(name = "JWT 로그인 토큰")
	String accessToken = null;

	public static MemberLoginResponseDto of(Integer statusCode, String accessToken) {
		MemberLoginResponseDto responseDto = new MemberLoginResponseDto();
		responseDto.setAccessToken(accessToken);
		responseDto.setStatusCode(statusCode);
		return responseDto;
	}

}
