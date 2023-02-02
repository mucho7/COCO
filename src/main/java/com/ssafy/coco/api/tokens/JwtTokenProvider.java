package com.ssafy.coco.api.tokens;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.ssafy.coco.api.members.data.MemberRepository;
import com.ssafy.coco.api.tokens.data.RefreshToken;
import com.ssafy.coco.api.tokens.data.RefreshTokenRepository;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	/** ===== 레퍼런스 =====
	 * Spring Security & Jwt 로그인 적용하기
	 * https://velog.io/@jkijki12/Spirng-Security-Jwt-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
	 *
	 * jwt refresh token 적용기
	 * https://velog.io/@jkijki12/Jwt-Refresh-Token-%EC%A0%81%EC%9A%A9%EA%B8%B0
	 *
	 * https://velog.io/@solchan/%EB%B0%B1%EC%97%85-Refresh-Token-%EB%B0%9C%EA%B8%89%EA%B3%BC-Access-Token-%EC%9E%AC%EB%B0%9C%EA%B8%89
	 */

	@Value("${jwt.secret}")
	private String uniqueKey;

	private int accessTokenValidTime = 1000 * 60 * 90; // AccessToken 유효시간 : 90분
	private int refreshTokenValidTime = 1000 * 60 * 60 * 12; // RefreshToken 유효시간 : 12시간

	private final UserDetailsService userDetailsService;
	private final MemberRepository memberRepository;

	private final RefreshTokenRepository refreshTokenRepository;

	@PostConstruct
	protected void init() {
		uniqueKey = Base64.getEncoder().encodeToString(uniqueKey.getBytes());
	}

	// 유저 정보를 토대로 AccessToken, RefreshToken을 생성하는 메서드
	public JwtTokenDto createToken(String userId, List<String> roles) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("roles", roles);

		Date now = new Date();

		// Access Token 생성
		String accessToken = Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + accessTokenValidTime)) // Access Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		// Refresh Token 생성
		String refreshToken = Jwts.builder()
			.setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // Refresh Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		return JwtTokenDto.builder()
			.grantType("Bearer")
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.userId(userId)
			.build();

	}

	// Jwt 토큰을 복호화하여 인증 정보 조회
	public Authentication getAuthentication(String token) {
		String userId = this.getUserIdFromAccessToken(token);
		System.out.println("토큰에서 추출한 userId: " + userId);
		UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
		System.out.println("loadUserByUserName 이후 추출한 userdetails: " + userDetails);
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// Jwt 토큰에서 회원 ID 추출
	public String getUserIdFromAccessToken(String token) {
		return Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token).getBody().getSubject();
	}

	// RefreshToken에는 기본적으로 사용자 ID가 없음. 따라서 refreshToken Repository를 찾아서 사용자 ID를 가져오는 방식 사용.
	public String getUserIdFromRefreshToken(String refreshToken) {
		Optional<RefreshToken> refreshTokenDto = refreshTokenRepository.findByRefreshToken(refreshToken);

		if (refreshTokenDto.isPresent()) {
			return refreshTokenDto.get().getUserId();
		} else {
			return null;
		}
	}

	public List<String> getRoles(String userId) {
		return memberRepository.findByUserId(userId).get().getRoles();
	}

	public JwtTokenDto resolveToken(HttpServletRequest request) {
		JwtTokenDto tokenDto = new JwtTokenDto();
		if (request.getHeader("authorization") != null)
			tokenDto.setAccessToken(request.getHeader("authorization").substring(7));
		if (request.getHeader("refreshToken") != null)
			tokenDto.setRefreshToken(request.getHeader("refreshToken").substring(7));
		return tokenDto;
	}

	public boolean existsRefreshToken(String refreshToken) {
		return refreshTokenRepository.existsByRefreshToken(refreshToken);
	}

	// 토큰 정보를 검증하는 메서드
	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (SecurityException | MalformedJwtException e) {
			log.info("유효하지 않은 Access Token !! -> " + token);
		} catch (ExpiredJwtException e) {
			log.info("만료된 Access Token !! -> " + token);
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 형식의 Access Token !! -> " + token);
		} catch (IllegalArgumentException e) {
			log.info("Access Token이 빈 문자열을 반환하였습니다 !! -> " + token);
		}
		return false;
	}

	// refreshToken에 대한 유효성 검사
	public String validateRefreshToken(RefreshToken requestToken) {
		// Refresh Token 객체에서 refreshToken 추출
		String refreshToken = requestToken.getRefreshToken().trim();
		if (refreshToken.startsWith("bearer ")) {
			refreshToken = refreshToken.substring(7);
		}
		System.out.println(refreshToken);
		try {
			// Refresh Token 검증
			Jws<Claims> claims = Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(refreshToken);
			System.out.println("claim의 body: " + claims);
			System.out.println("claim의 body get: " + claims.getBody().get("Id"));

			if (!claims.getBody().getExpiration().before(new Date())) {
				String userId = requestToken.getUserId();
				System.out.println("토큰 상의 UserID: " + userId + ", claims상의 UserId: " + claims.getBody().getId());
				return recreateAccessToken(userId, (memberRepository.findByUserId(userId)).get().getRoles());
				// TODO : 사용자 권한 하드코딩한거 고치는 방법 찾아보기
			}
		} catch (Exception e) {
			//  Refresh Token이 만료된 경우 로그인 필요
			e.printStackTrace();
			return null;
		}
		return null;
	}

	// refresh token을 받아 유효성을 검증하고, 유효성 통과시 새로운 access token을 생성하여 반환해준다.
	private String recreateAccessToken(String userId, Object roles) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("roles", roles);
		Date now = new Date();

		//Access Token
		String accessToken = Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + accessTokenValidTime))
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		return accessToken;
	}

}
