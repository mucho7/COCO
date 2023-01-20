package com.ssafy.coco.api.tokens;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import lombok.RequiredArgsConstructor;

// TODO: 이거 필요한 클래스인거 맞음? -> 삭제 가능하면 삭제 가능하기
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
	private final JwtTokenGenerator jwtTokenGenerator;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {

		// Step 1. RequestHeader (req)에서 jwt 토큰 추출
		String token = extractToken((HttpServletRequest)request);

		System.out.println(token);

		// Step 2. 토큰의 유효성 검사
		if (token != null && jwtTokenGenerator.validateToken(token)) {
			Authentication authentication = jwtTokenGenerator.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		chain.doFilter(request, response);
	}

	// RequestHeader에서 정보 추출하는 메서드
	private String extractToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("auth");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
			System.out.println("추출한 토큰: " + bearerToken);
			return bearerToken.substring(7);
		}
		return null;
	}
}
