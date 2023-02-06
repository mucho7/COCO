package com.ssafy.coco.api.members.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.members.dto.request.ValidateRequestDto;
import com.ssafy.coco.api.tokens.service.JwtTokenService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "요청 검증 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/validate")
public class RequestValidationCheckController {

	private final JwtTokenService jwtTokenService;

	@PostMapping
	@ApiOperation(value = "요청 검증", notes = "넘겨받은 회원정보를 바탕으로 회원을 DB에 등록한다.")
	public boolean validateRequest(
		@RequestBody @ApiParam(value = "브라우저에 있는 사용자 ID", required = true) ValidateRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization");
		return jwtTokenService.validateRequest(requestDto.getUserId(), accessToken);
	}

}
