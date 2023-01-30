package com.ssafy.coco.api.tokens.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.coco.api.tokens.JwtTokenProvider;
import com.ssafy.coco.api.tokens.data.RefreshToken;
import com.ssafy.coco.api.tokens.data.RefreshTokenRepository;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtTokenService {

	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Transactional
	public void login(JwtTokenDto tokenDto) {
		RefreshToken refreshToken = RefreshToken.builder()
			.userId(tokenDto.getUserId())
			.refreshToken(tokenDto.getRefreshToken())
			.build();
		String requestUserId = refreshToken.getUserId();
		if (refreshTokenRepository.existsByUserId(requestUserId)) {
			log.info(requestUserId + "의 기존 Refresh Token을 삭제합니다.");
			refreshTokenRepository.deleteByUserId(requestUserId);
		}
		log.info(requestUserId + "의 Refresh Token을 생성합니다.");
		refreshTokenRepository.save(refreshToken);
	}

	@Transactional
	public boolean logout(String refreshToken){
		if(refreshTokenRepository.existsByRefreshToken(refreshToken)){
			log.info("DB에서 refresh 토큰 조회에 성공했습니다. "+refreshToken);
			refreshTokenRepository.deleteByRefreshToken(refreshToken);
			return true;
		}
		return false;
	}

	public Optional<RefreshToken> getRefreshToken(String refreshToken) {

		return refreshTokenRepository.findByRefreshToken(refreshToken.substring(7));
	}

	public Map<String, String> validateRefreshToken(String refreshToken) {
		System.out.println("-> JWTTokenService#validateRefreshToken: " + refreshToken);
		RefreshToken newRefreshToken = getRefreshToken(refreshToken).get();
		System.out.println("new refreshToken: " + newRefreshToken);
		String createdAccessToken = jwtTokenProvider.validateRefreshToken(newRefreshToken);
		return createRefreshInfo(createdAccessToken);
	}

	public Map<String, String> createRefreshInfo(String createdAccessToken) {
		Map<String, String> map = new HashMap<>();
		log.info("Service가 받은 토큰: " + createdAccessToken);
		if (createdAccessToken == null) {
			map.put("status", "401");
			log.info("[JwtTokenService - createRefreshInfo] 만료된 Refresh Token입니다. 재로그인이 필요합니다.");
			// map.put("message", "만료된 Refresh Token입니다. 재로그인이 필요합니다.");
			map.put("accessToken", null);
		} else {
			map.put("status", "200");
			log.info("유효한 Refresh Token입니다. 새로 생성된 AccessToken을 반환합니다.");
			// map.put("message", "[JwtTokenService - createRefreshInfo] 유효한 Refresh Token입니다. 새로 생성된 AccessToken을 반환합니다.");
			map.put("accessToken", createdAccessToken);
		}
		return map;
	}
}

