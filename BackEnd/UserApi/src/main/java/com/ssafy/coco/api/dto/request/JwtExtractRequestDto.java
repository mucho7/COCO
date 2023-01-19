package com.ssafy.coco.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class JwtExtractRequestDto {
	String accessToken, refreshToken;
}
