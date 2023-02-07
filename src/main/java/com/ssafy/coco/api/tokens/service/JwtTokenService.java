package com.ssafy.coco.api.tokens.service;

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
	public boolean logout(String refreshToken) {
		if (refreshToken.startsWith("bearer ")) {
			refreshToken = refreshToken.substring(7);
		}
		if (refreshTokenRepository.existsByRefreshToken(refreshToken)) {
			log.info("DB에서 refresh 토큰 조회에 성공했습니다. " + refreshToken);
			refreshTokenRepository.deleteByRefreshToken(refreshToken);
			return true;
		} else {
			System.out.println("DB에서 refreshToken 조회에 실패했습니다.");
		}
		return false;
	}

	public boolean validateRequest(String userId, String accessToken) {
		if (accessToken.startsWith("bearer ")) {
			accessToken = accessToken.substring(7);
		}
		String extractedId = jwtTokenProvider.getUserIdFromAccessToken(accessToken);
		System.out.println("[validateRequest@JwtTokenService]Id: " + userId + ", extractedId: " + extractedId);
		return extractedId.equals(userId);
	}
}