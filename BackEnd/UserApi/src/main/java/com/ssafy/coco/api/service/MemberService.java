package com.ssafy.coco.api.service;

import javax.transaction.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.dto.JwtTokenDto;
import com.ssafy.coco.api.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.dto.response.MemberResponseDto;
import com.ssafy.coco.data.Member;
import com.ssafy.coco.data.MemberRepository;
import com.ssafy.coco.utility.jwt.JwtTokenGenerator;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	private final MemberRepository memberRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenGenerator jwtTokenGenerator;

	@Transactional
	public String RegisterMember(MemberRegisterRequestDto requestDto) {
		return memberRepository.save(requestDto.toEntity()).getUserId();
	}

	@Transactional
	public String UpdateInfo(String id, MemberUpdateRequestDto requestDto) {
		Member member = memberRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + id));
		System.out.println(member.getDelFlag() + ", 탈퇴했는가? : " + member.getDelFlag() != null);
		if (member.getDelFlag() != null)
			throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + id);
		else
			member.UpdateInfo(requestDto.getPassword(), requestDto.getName(), requestDto.getEmail());
		return id;
	}

	public MemberResponseDto findById(String id) {
		Member entity = memberRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + id));

		return new MemberResponseDto(entity);
	}

	@Transactional
	public String DeleteMember(String id, MemberDeleteRequestDto requestDto) {
		Member member = memberRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + id));
		if (member.getDelFlag() != null) // error code: 500
			throw new IllegalArgumentException("해당 사용자는 이미 탈퇴한 사용자입니다. 사용자 ID: " + id);
		else
			member.DeleteMember(requestDto.getTime());
		return id;
	}

	@Transactional
	public String RatingUpdate(MemberRatingUpdateRequestDto requestDto) {
		Member member = memberRepository.findById(requestDto.getUserId())
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + requestDto.getUserId()));
		if (member.getDelFlag() != null) // error code: 500
			throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + requestDto.getUserId());
		else
			member.UpdateRating(requestDto.getAmount());
		return requestDto.getUserId();
	}

	@Transactional
	public boolean IdCheck(String id) {
		Long count = memberRepository.countById(id);
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

		// System.out.println("로그인 시도 ID: " + id + ", 입력한 비밀번호: " + password);

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

		// System.out.println(authenticationToken);

		// Step 2. 실제 검증 (사용자 비밀번호 체크 등)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		// System.out.println(authentication);

		// Step 3. 인증된 정보를 기반으로 JwtToken 생성
		JwtTokenDto jwtToken = jwtTokenGenerator.createToken(authentication);

		// System.out.println(jwtToken);

		return jwtToken;
	}

}
