package com.ssafy.coco.api.members.controller;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.members.dto.MailDto;
import com.ssafy.coco.api.members.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberLoginRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.members.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.members.dto.request.SendPasswordRequestDto;
import com.ssafy.coco.api.members.dto.response.MemberResponseDto;
import com.ssafy.coco.api.members.service.MemberService;
import com.ssafy.coco.api.tokens.dto.JwtTokenDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(tags = "회원 관리 API")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/member/register")
	@ApiOperation(value = "회원 가입", notes = "넘겨받은 회원정보를 바탕으로 회원을 DB에 등록한다.")
	public Long RegisterMember(
		@RequestBody @ApiParam(value = "회원가입 정보", required = true) MemberRegisterRequestDto requestDto) {
		return memberService.RegisterMember(requestDto);
	}

	@PutMapping("/member/info/{id}")
	@ApiOperation(value = "정보 변경", notes = "갱신된 사용자 정보를 {id}를 PK로 가지는 레코드에 적용한다.")
	public String UpdateMember(@PathVariable @ApiParam(value = "회원정보를 수정할 사용자의 {id}", required = true) String id,
		@RequestBody @ApiParam(value = "수정할 내용이 담긴 데이터 객체", required = true) MemberUpdateRequestDto requestDto) {

		return memberService.UpdateInfo(id, requestDto);
	}

	@GetMapping("/member/info/{id}")
	@ApiOperation(value = "정보 조회", notes = "{id}에 해당하는 사용자 정보를 DB에서 가져온다.")
	public MemberResponseDto findById(
		@PathVariable @ApiParam(value = "회원정보를 조회할 사용자의 {id}", required = true) String id) {
		return memberService.findByUserId(id);
	}

	@PutMapping("/member/delete/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "{id}의 사용자 정보에 탈퇴일(del_flag)을 기록한다.")
	public String DeleteMember(@PathVariable @ApiParam(value = "탈퇴할 회원 ID", required = true) String id,
		@RequestBody @ApiParam(value = "회원이 탈퇴를 요청한 시각", required = true) MemberDeleteRequestDto requestDto) {

		return memberService.DeleteMember(id, requestDto);
	}

	@PutMapping("/member/rating")
	@ApiOperation(value = "평판 점수 변경", notes = "사용자의 평판점수를 변경한다.")
	public String RatingUpdate(
		@RequestBody @ApiParam(value = "평판점수 변경 요청 정보", required = true) MemberRatingUpdateRequestDto requestDto) {
		return memberService.RatingUpdate(requestDto);
	}

	@PostMapping("/extract") // TODO : accessToken에서 회원 ID 추출 로직 추가
	@ApiOperation(value = "Jwt 토큰 정보 추출", notes = "제공된 AccessToken으로부터 사용자 ID를 추출해 반환한다.")
	public String ExtractMemberFromJwtToken(HttpServletRequest request) {
		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			System.out.println("request.getHeaderNames()==>" + headerNames.nextElement());
		}
		return request.getHeader("Authorization");
	}

	/**
	 * 만들어두긴 했으나, 내부 네트워크 환경에서 smtp 서버에 연결 불가로 인해 시연이 불가능할 것으로 판단.
	 * 추후 사용을 위해 남겨두긴 하겠지만, 현재 프로젝트에서는 사용하지 않는 API.
	 */
	@PostMapping("/sendMail")
	public String sendPassword(
		@RequestBody @ApiParam(value = "임시 비밀번호 발급 요청 정보", required = true) SendPasswordRequestDto requestDto) {

		String userId = requestDto.getUserId();
		String email = requestDto.getEmail();

		boolean isAvaliable = memberService.ExistUserByIdAndEmail(userId, email);

		if (isAvaliable) {
			MailDto mailDto = memberService.createMailAndMakeTempPassword(userId, email);
			memberService.sendMail(mailDto);
			return "입력하신 이메일로 임시 비밀번호를 보내드렸습니다.";
		} else {
			return "입력한 정보에 해당하는 사용자가 없습니다.";
		}
	}

	@PostMapping("/tempPassword")
	public String getTempPassword(
		@RequestBody @ApiParam(value = "임시 비밀번호 발급 요청 정보", required = true) SendPasswordRequestDto requestDto) {
		String userId = requestDto.getUserId();
		String userEmail = requestDto.getEmail();

		boolean isValidInformation = memberService.ExistUserByIdAndEmail(userId, userEmail);

		if (isValidInformation) {
			String tempPassword = memberService.getTmpPassword(userId);
			return userId + " 님의 임시 비밀번호는 [ " + tempPassword + " ] 입니다.";
		}
		else return "입력하신 정보에 일치하는 회원이 없습니다.";
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "ID와 암호화된 PW가 DB에 있는 정보와 일치하는 경우 로그인을 승인한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "정상 로그인"),
		@ApiResponse(code = 403, message = "아이디 또는 비밀번호 오류"),
		@ApiResponse(code = 500, message = "내부 서버 오류")
	})
	public ResponseEntity login(
		@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) MemberLoginRequestDto requestDto,
		HttpServletResponse response) {
		String userId = requestDto.getUserId();
		String password = requestDto.getPassword();

		JwtTokenDto jwtToken = memberService.login(userId, password);

		System.out.println("로그인 - " + jwtToken);

		if (jwtToken != null) {

			response.setHeader("Authorization", "bearer " + jwtToken.getAccessToken());
			response.setHeader("refreshToken", "bearer " + jwtToken.getRefreshToken());

			return ResponseEntity.ok().body("로그인 성공");
		}

		return ResponseEntity.internalServerError().body("내부 서버 오류");
	}

	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃", notes = "Http 헤더로부터 refreshToken을 추출하여 DB에서 삭제 한다.")
	public ResponseEntity logout(HttpServletRequest request) {
		String refreshToken = request.getHeader("refreshToken");
		if (refreshToken != null) {
			boolean isLogoutSuccessful = memberService.logout(refreshToken);
			return ResponseEntity.ok().body("정상적으로 로그아웃되었습니다.");
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("토큰 값이 유효하지 않습니다.");
	}

}
