package com.ssafy.coco.api.members.service;

import javax.transaction.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.members.data.Member;
import com.ssafy.coco.api.members.data.MemberRepository;
import com.ssafy.coco.api.members.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.members.dto.response.MemberResponseDto;
import com.ssafy.coco.api.tokens.JwtTokenGenerator;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;
import com.ssafy.coco.api.tokens.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService implements UserDetailsService {
	private final MemberRepository memberRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenGenerator jwtTokenGenerator;

	private final JwtTokenService jwtService;

	private final PasswordEncoder passwordEncoder;

	@Transactional
	public Long RegisterMember(MemberRegisterRequestDto requestDto) {
		return memberRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional
	public String UpdateInfo(String userId, MemberUpdateRequestDto requestDto) {
		Member member = memberRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + userId));
		// System.out.println(member.getDelFlag() + ", 탈퇴했는가? : " + member.getDelFlag() != null);
		if (member.getDelFlag() != null)
			throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + userId);
		else
			member.UpdateInfo(requestDto.getPassword(), requestDto.getName(), requestDto.getEmail());
		return userId;
	}

	public MemberResponseDto findByUserId(String userId) {
		Member entity = memberRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + userId));

		return new MemberResponseDto(entity);
	}

	@Transactional
	public String DeleteMember(String userId, MemberDeleteRequestDto requestDto) {
		Member member = memberRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + userId));
		if (member.getDelFlag() != null) // error code: 500
			throw new IllegalArgumentException("해당 사용자는 이미 탈퇴한 사용자입니다. 사용자 ID: " + userId);
		else
			member.DeleteMember(requestDto.getTime());
		return userId;
	}

	@Transactional
	public String RatingUpdate(MemberRatingUpdateRequestDto requestDto) {
		Member member = memberRepository.findByUserId(requestDto.getUserId())
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + requestDto.getUserId()));
		if (member.getDelFlag() != null) // error code: 500
			throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + requestDto.getUserId());
		else
			member.UpdateRating(requestDto.getAmount());
		return requestDto.getUserId();
	}

	@Transactional
	public boolean IdCheck(String userId) {
		Long count = memberRepository.countByUserId(userId);
		return count == 0;
	}

	@Transactional
	public boolean EmailCheck(String email) {
		Long count = memberRepository.countByEmail(email);
		return count == 0;
	}

	@Transactional
	public JwtTokenDto login(String id, String password) {
		// Step 1. 로그인 ID/비밀번호 기반으로 Authentication 객체 생성
		// 이 때, 인증 여부를 확인하는 authenticated 값을 false로 한다.

		System.out.println("로그인 시도 ID: " + id + ", 입력한 비밀번호: " + password);

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

		System.out.println(authenticationToken);

		// Step 2. 실제 검증 (사용자 비밀번호 체크 등)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		System.out.println(authentication.getPrincipal());

		// Step 3. 인증된 정보를 기반으로 JwtToken 생성
		UserDetails userDetails = (User)authentication.getPrincipal();
		JwtTokenDto jwtToken = jwtTokenGenerator.createToken(userDetails.getUsername(), userDetails.getAuthorities());

		System.out.println("생성된 JwtTokenDto: " + jwtToken);
		jwtService.login(jwtToken);

		return jwtToken;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return memberRepository.findByUserId(username)
			.map(this::createUserDetail)
			.orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
	}

	private UserDetails createUserDetail(Member member) {
		return User.builder()
			.username(member.getUsername())
			.password(passwordEncoder.encode(member.getPassword()))
			.roles(member.getRole())
			.build();
	}

}
