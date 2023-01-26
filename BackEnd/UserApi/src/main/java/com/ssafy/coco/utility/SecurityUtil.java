package com.ssafy.coco.utility;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.ssafy.coco.api.members.data.Member;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 회원가입, 권한 검증등을 위한 Security Utility 설정
 * https://happy-my.tistory.com/29
 */
@Slf4j
@NoArgsConstructor
public class SecurityUtil {
	public static Optional<String> getCurrentUserId() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null) {
			log.debug("[SecurityUtil] Security Context에 인증 정보가 없습니다.");
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}
		String userId=null;
		if(authentication.getPrincipal() instanceof Member) {
			UserDetails springSecurityUser = (Member)authentication.getPrincipal();
			userId= springSecurityUser.getUsername();
		}
		else if(authentication.getPrincipal() instanceof String)
			userId=(String) authentication.getPrincipal();

		return Optional.ofNullable(userId);
	}

}
