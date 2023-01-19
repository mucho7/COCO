package com.ssafy.coco.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.dto.response.MemberResponseDto;
import com.ssafy.coco.api.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "회원관리 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "넘겨받은 회원정보를 바탕으로 회원을 DB에 등록한다.")
	public Long RegisterMember(
		@RequestBody @ApiParam(value = "회원가입 정보", required = true) MemberRegisterRequestDto requestDto) {
		return memberService.RegisterMember(requestDto);
	}

	@PutMapping("/info/{id}")
	@ApiOperation(value = "정보 변경", notes = "갱신된 사용자 정보를 {id}를 PK로 가지는 레코드에 적용한다.")
	public String UpdateMember(@PathVariable @ApiParam(value = "회원정보를 수정할 사용자의 {id}", required = true) String id,
		@RequestBody @ApiParam(value = "수정할 내용이 담긴 데이터 객체", required = true) MemberUpdateRequestDto requestDto) {

		return memberService.UpdateInfo(id, requestDto);
	}

	@GetMapping("/info/{id}")
	@ApiOperation(value = "정보 조회", notes = "{id}에 해당하는 사용자 정보를 DB에서 가져온다.")
	public MemberResponseDto findById(
		@PathVariable @ApiParam(value = "회원정보를 조회할 사용자의 {id}", required = true) String id) {
		return memberService.findByUserId(id);
	}

	@PutMapping("/info/delete/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "{id}의 사용자 정보에 탈퇴일(del_flag)을 기록한다.")
	public String DeleteMember(@PathVariable @ApiParam(value = "탈퇴할 회원 ID", required = true) String id,
		@RequestBody @ApiParam(value = "회원이 탈퇴를 요청한 시각", required = true) MemberDeleteRequestDto requestDto) {

		return memberService.DeleteMember(id, requestDto);
	}

	@PutMapping("/rating")
	@ApiOperation(value = "평판 점수 변경", notes = "사용자의 평판점수를 변경한다.")
	public String RatingUpdate(@RequestBody MemberRatingUpdateRequestDto requestDto) {
		return memberService.RatingUpdate(requestDto);
	}

}
