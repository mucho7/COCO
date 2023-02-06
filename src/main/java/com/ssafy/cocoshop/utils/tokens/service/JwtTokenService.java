package com.ssafy.cocoshop.utils.tokens.service;

import java.util.Base64;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtTokenService {

	@Value("${jwt.secret}")
	private String uniqueKey;

	@PostConstruct
	protected void init() {
		uniqueKey = Base64.getEncoder().encodeToString(uniqueKey.getBytes());
	}

	public String getUserIdFromAccessToken(String accessToken) {
		return Jwts.parserBuilder().setSigningKey(uniqueKey).build().parseClaimsJws(accessToken).getBody().getSubject();
	}

}

