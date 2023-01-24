package com.ssafy.coco.api.members.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.members.data.Member;
import com.ssafy.coco.api.members.data.MemberRepository;
import com.ssafy.coco.api.members.dto.MailDto;
import com.ssafy.coco.api.members.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.members.dto.response.MemberResponseDto;
import com.ssafy.coco.api.tokens.JwtTokenProvider;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;
import com.ssafy.coco.api.tokens.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

/**
 * 임시비밀번호 보내는 코드 reference
 * https://velog.io/@hellocdpa/220319-%EC%9E%84%EC%8B%9C%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%9D%B4%EB%A9%94%EC%9D%BC%EB%A1%9C-%EB%B3%B4%EB%82%B4%EB%8A%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
 *
 */

@RequiredArgsConstructor
@Service
public class MemberService {
	private final MemberRepository memberRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;

	private final JwtTokenService jwtService;

	private final MailSender mailSender;
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

	public boolean ExistUserByIdAndEmail(String userId, String email) {
		return memberRepository.existsByUserIdAndEmail(userId, email);
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
		// authenticate 매서드가 실행될 때 MemberService 에서 만든 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		System.out.println(authentication.getPrincipal());

		// Step 3. 인증된 정보를 기반으로 JwtToken 생성
		UserDetails userDetails = (User)authentication.getPrincipal();
		System.out.println(userDetails.toString());
		String userId = userDetails.getUsername();
		List<String> roles = memberRepository.findByUserId(userId).get().getRoles();
		JwtTokenDto jwtToken = jwtTokenProvider.createToken(userId, roles);

		System.out.println("생성된 JwtTokenDto: " + jwtToken);
		jwtService.login(jwtToken);

		return jwtToken;
	}

	public MailDto createMailAndMakeTempPassword(String userId, String email) {
		String tempPassword = makeTempPassword();
		MailDto mailDto = new MailDto();
		mailDto.setAddress(email);
		mailDto.setTitle("[CoCo] 임시 비밀번호가 발급되었습니다.");
		mailDto.setMessage(
			"안녕하세요. CoCo입니다. \n" + userId + "님의 임시 비밀번호는 [ " + tempPassword
				+ " ] 입니다. \n\n임시 비밀번호로 로그인 후 반드시 비밀번호를 변경해주세요.");
		updatePassword(userId, tempPassword);
		return mailDto;
	}

	private void updatePassword(String userId, String tempPassword) {
		Member member = memberRepository.findByUserId(userId).get();
		member.UpdatePassword(tempPassword); // TODO: 추후 MD5로 변환하여 저장하는 로직 필요함.
		memberRepository.save(member);
	}

	private String makeTempPassword() {
		char[] charSet = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
			'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
			'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z'};
		StringBuilder tempPassword = new StringBuilder();

		for (int i = 0; i < 10; i++) {
			int idx = (int)(charSet.length * Math.random());
			tempPassword.append(charSet[idx]);
		}
		return tempPassword.toString();
	}

	public void sendMail(MailDto mailDto) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mailDto.getAddress());
		message.setSubject(mailDto.getTitle());
		message.setText(mailDto.getMessage());
		message.setFrom("vmflzh01@naver.com");
		System.out.println("보낸 메일 정보: " + message);
		mailSender.send(message);
	}

}
