package com.ssafy.coco.api.members.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.members.dto.request.MemberLoginRequestDto;
import com.ssafy.coco.api.members.service.MemberService;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(tags = "로그인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class MemberLoginController {

	private final MemberService memberService;

	@PostMapping()
	@ApiOperation(value = "로그인", notes = "ID와 암호화된 PW가 DB에 있는 정보와 일치하는 경우 로그인을 승인한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "정상 로그인"),
		@ApiResponse(code = 403, message = "아이디 또는 비밀번호 오류"),
		@ApiResponse(code = 500, message = "내부 서버 오류")
	})
	public JwtTokenDto login(
		@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) MemberLoginRequestDto requestDto) {
		String userId = requestDto.getUserId();
		String password = requestDto.getPassword();

		// System.out.println("id: " + userId + ", pw: " + password);

		JwtTokenDto jwtToken = memberService.login(userId, password);

		return jwtToken;
	}

}
