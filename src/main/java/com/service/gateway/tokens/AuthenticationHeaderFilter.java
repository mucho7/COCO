package com.service.gateway.tokens;

import java.util.List;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.service.gateway.tokens.dto.JwtTokenDto;

import lombok.Getter;
import lombok.Setter;

@Component
public class AuthenticationHeaderFilter extends AbstractGatewayFilterFactory<AuthenticationHeaderFilter.Config> {

	private final JwtTokenProvider jwtTokenProvider;

	public AuthenticationHeaderFilter(JwtTokenProvider jwtTokenProvider){
		super(Config.class);
		this.jwtTokenProvider=jwtTokenProvider;
	}

	@Override
	public GatewayFilter apply(Config config) {

		return ((exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();
			ServerHttpResponse response = exchange.getResponse();

			// Step 1. RequestHeader에서 jwt 토큰 추출
			JwtTokenDto tokenDto = jwtTokenProvider.resolveToken(request);
			String accessToken = tokenDto.getAccessToken();
			String refreshToken = tokenDto.getRefreshToken();

			// Step 2. 토큰의 유효성 검사
			if (accessToken != null) {
				if (jwtTokenProvider.validateToken(accessToken)) {
					setAuthentication(accessToken);
				}
				// Access Token이 만료되었으며, Refresh Token이 존재하는 상황
				else if (!jwtTokenProvider.validateToken(accessToken) && refreshToken != null) {
					System.out.println("만료된 AccessToken : "+accessToken);
					System.out.println("헤더에서 refreshToken을 발견하여 재발급 처리를 진행합니다.");
					// 재발급 후, 컨텍스트에 다시 넣기
					// Refresh Token 검증
					boolean validateRefreshToken = jwtTokenProvider.validateToken(refreshToken);
					// Refresh Token 저장소 존재유무 확인
					boolean isRefreshToken = jwtTokenProvider.existsRefreshToken(refreshToken);
					if (validateRefreshToken && isRefreshToken) {
						// Refresh Token으로 사용자 ID 가져오기
						String userId = jwtTokenProvider.getUserIdFromRefreshToken(refreshToken);
						System.out.println("재발급 과정에서 refreshtoken을 기반으로 DB에 등록된 사용자 ID: "+userId);
						// UserId로 권한정보 받아오기
						List<String> roles = jwtTokenProvider.getRoles(userId);
						System.out.println("[doFilterInternal@JwtAuthenticationFilter] roles: "+roles);
						// 토큰 발급
						JwtTokenDto newJwtToken = jwtTokenProvider.createToken(userId, roles);
						// 헤더에 토큰 정보(AccessToken, refreshToken) 추가
						response.getHeaders().add("Authorization", "bearer " + newJwtToken.getAccessToken());
						response.getHeaders().add("refreshToken", "bearer " + newJwtToken.getRefreshToken());
						// 컨텍스트에 넣기
						System.out.println("[doFilterInternal@JwtAuthenticationFilter] newJwtToken:\n"+newJwtToken);
						this.setAuthentication(newJwtToken.getAccessToken());
					}
				}
			}
			return chain.filter(exchange);
		});


	}

	// SecurityContext 에 Authentication 객체를 저장.
	public void setAuthentication(String token) {
		System.out.println("[setAuthentication@JwtAuthenticationFilter] token: " + token);
		// 토큰으로부터 유저 정보를 받아옵니다.
		Authentication authentication = jwtTokenProvider.getAuthentication(token);
		System.out.println("[setAuthentication@JwtAuthenticationFilter] authentication: "+authentication);
		// SecurityContext 에 Authentication 객체를 저장합니다.
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	@Getter @Setter
	public static class Config {
		String baseMessage;
		private boolean preLogger;
		private boolean postLogger;
	}


}
