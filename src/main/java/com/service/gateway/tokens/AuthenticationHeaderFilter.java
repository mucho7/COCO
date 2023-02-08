package com.service.gateway.tokens;

import java.util.List;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.service.gateway.tokens.dto.JwtTokenDto;

import lombok.Getter;
import lombok.Setter;

@Component
public class AuthenticationHeaderFilter extends AbstractGatewayFilterFactory<AuthenticationHeaderFilter.Config> {

	private final JwtTokenProvider jwtTokenProvider;

	public AuthenticationHeaderFilter(JwtTokenProvider jwtTokenProvider) {
		super(Config.class);
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public GatewayFilter apply(Config config) {

		return ((exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();
			ServerHttpResponse response = exchange.getResponse();
			ServerWebExchange newExchange = exchange;

			// Step 1. RequestHeader에서 jwt 토큰 추출
			JwtTokenDto tokenDto = jwtTokenProvider.resolveToken(
				request); // 유효하지 않은 세션 (refreshToken이 DB에 있는 값과 다른 값)인지 판단
			// 유효한 로그인 세션이라면
			if (tokenDto != null) {
				String accessToken = tokenDto.getAccessToken();
				String refreshToken = tokenDto.getRefreshToken();

				// Step 2. 토큰의 유효성 검사
				if (!jwtTokenProvider.validateToken(accessToken) && jwtTokenProvider.validateToken(refreshToken)) {
					if (accessToken != null) {
						System.out.println(
							"만료된 AccessToken : " + accessToken + "\n헤더에서 refreshToken을 발견하여 재발급 처리를 진행합니다.");
						// 재발급 후, 컨텍스트에 다시 넣기
						// Refresh Token 검증
						boolean validateRefreshToken = jwtTokenProvider.validateToken(refreshToken);
						// Refresh Token 저장소 존재유무 확인
						boolean isRefreshToken = jwtTokenProvider.existsRefreshToken(refreshToken);
						if (validateRefreshToken && isRefreshToken) {
							// Refresh Token으로 사용자 ID 가져오기
							String userId = jwtTokenProvider.getUserIdFromRefreshToken(refreshToken);
							System.out.println("재발급 과정에서 refreshtoken을 기반으로 DB에 등록된 사용자 ID: " + userId);
							// UserId로 권한정보 받아오기
							List<String> roles = jwtTokenProvider.getRoles(userId);
							// 토큰 발급
							JwtTokenDto newJwtToken = jwtTokenProvider.createToken(userId, roles);
							System.out.println(
								"[doFilterInternal@AuthenticationHeaderFilter] newJwtToken:\n" + newJwtToken);
							// 헤더에 토큰 정보(AccessToken, refreshToken) 추가
							response.getHeaders().add("Authorization", "bearer " + newJwtToken.getAccessToken());
							response.getHeaders().add("refreshToken", "bearer " + newJwtToken.getRefreshToken());
							System.out.println("response header에 넣기 성공");

							ServerHttpRequest newRequest = exchange.getRequest()
								.mutate()
								.header("Authorization", new String[] {"bearer " + newJwtToken.getAccessToken()})
								.header("refreshToken", new String[] {"bearer " + newJwtToken.getRefreshToken()})
								.build();

							newExchange = exchange.mutate().request(newRequest).build();
							System.out.println("request header에 넣기 성공");
						}
					}
				}
				return chain.filter(newExchange);
			} else {
				response.setStatusCode(HttpStatus.BAD_REQUEST);
				// response.getHeaders().setLocation(URI.create("http://i8a703.p.ssafy.io:8012/member/logout")); // 이 경우
				return chain.filter(newExchange.mutate().request(request).response(response).build());
			}
		});

	}

	@Getter
	@Setter
	public static class Config {

	}

}
