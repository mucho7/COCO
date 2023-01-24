package com.ssafy.coco.api.members.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
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
	public ResponseEntity login(
		@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) MemberLoginRequestDto requestDto,
		HttpServletResponse response) {
		String userId = requestDto.getUserId();
		String password = requestDto.getPassword();

		JwtTokenDto jwtToken = memberService.login(userId, password);

		if (jwtToken != null) {

			response.setHeader("authorization", "bearer " + jwtToken.getAccessToken());
			response.setHeader("refreshToken", "bearer " + jwtToken.getRefreshToken());

			return ResponseEntity.ok().body("로그인 성공");
		}

		return ResponseEntity.internalServerError().body("내부 서버 오류");

	}

}
