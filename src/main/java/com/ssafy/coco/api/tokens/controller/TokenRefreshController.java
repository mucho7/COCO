package com.ssafy.coco.api.tokens.controller;

import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.tokens.service.JwtTokenService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/token")
@Api(tags = "토큰 갱신 API")
public class TokenRefreshController {

	private final JwtTokenService jwtTokenService;

	@PostMapping("/refresh")
	@ApiOperation(value = "AccessToken 재발급", notes = "RefreshToken의 유효시간이 남아있는지 검사하고, 유효한 경우 새로운 AccessToken을 생성하여 반환한다.")
	public ResponseEntity<?> validateRefreshToken(HttpServletRequest request) {
		// log.info("refresh controller 실행");
		String token = request.getHeader("refreshToken");
		// log.info("헤더에서 추출된 refresh token: " + token);
		Map<String, String> map = jwtTokenService.validateRefreshToken(token);

		if (map.get("status").equals("401")) {
			log.info("TokenRefreshController - 만료된 Refresh Token입니다.");
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}

		log.info("TokenRefreshController - 유효한 Refresh Token입니다.");
		return new ResponseEntity<String>(map.get("accessToken"), HttpStatus.OK);
	}
}
