package com.ssafy.coco.api.tokens;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {

		// Step 1. RequestHeader에서 jwt 토큰 추출
		JwtTokenDto tokenDto = jwtTokenProvider.resolveToken(request);
		String accessToken = tokenDto.getAccessToken();
		String refreshToken = tokenDto.getRefreshToken();

		System.out.println(tokenDto);

		// Step 2. 토큰의 유효성 검사
		if (tokenDto.getAccessToken() != null) {
			if (jwtTokenProvider.validateToken(accessToken)) {
				setAuthentication(accessToken);
			}
			// Access Token이 만료되었으며, Refresh Token이 존재하는 상황
			else if (!jwtTokenProvider.validateToken(accessToken) && refreshToken != null) {
				// 재발급 후, 컨텍스트에 다시 넣기
				// Refresh Token 검증
				boolean validateRefreshToken = jwtTokenProvider.validateToken(refreshToken);
				// Refresh Token 저장소 존재유무 확인
				boolean isRefreshToken = jwtTokenProvider.existsRefreshToken(refreshToken);
				if (validateRefreshToken && isRefreshToken) {
					// Refresh Token으로 사용자 ID 가져오기
					String userId = jwtTokenProvider.getUserId(refreshToken);
					// UserId로 권한정보 받아오기
					List<String> roles = jwtTokenProvider.getRoles(userId);
					// 토큰 발급
					JwtTokenDto jwtToken = jwtTokenProvider.createToken(userId, roles);
					// 헤더에 토큰 정보(AccessToken, refreshToken) 추가
					response.setHeader("Authorization", "bearer " + jwtToken.getAccessToken());
					response.setHeader("refreshToken", "bearer " + jwtToken.getRefreshToken());
					// 컨텍스트에 넣기
					this.setAuthentication(jwtToken.getAccessToken());
				}
			}
		}
		chain.doFilter(request, response);
	}

	// SecurityContext 에 Authentication 객체를 저장.
	public void setAuthentication(String token) {
		System.out.println("setAuthentication의 token: " + token);
		// 토큰으로부터 유저 정보를 받아옵니다.
		Authentication authentication = jwtTokenProvider.getAuthentication(token);
		// SecurityContext 에 Authentication 객체를 저장합니다.
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

}
