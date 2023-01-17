package com.ssafy.coco.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.dto.JwtTokenDto;
import com.ssafy.coco.api.dto.request.MemberLoginRequestDto;
import com.ssafy.coco.api.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(value = "로그인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class MemberLoginController {

	private final MemberService memberService;

	@PostMapping()
	@ApiOperation(value = "로그인", notes = "ID와 암호화된 PW가 DB에 있는 정보와 일치하는 경우 로그인을 승인한다.")
	public JwtTokenDto login(
		@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) MemberLoginRequestDto requestDto) {
		String userId = requestDto.getId();
		String password = requestDto.getPassword();

		JwtTokenDto jwtToken = memberService.login(userId, password);
		System.out.println(jwtToken);
		return jwtToken;
	}

}
