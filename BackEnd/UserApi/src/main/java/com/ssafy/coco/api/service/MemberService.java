package com.ssafy.coco.api.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.coco.api.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.api.dto.response.MemberResponseDto;
import com.ssafy.coco.data.Member;
import com.ssafy.coco.data.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	private final MemberRepository memberRepository;

	@Transactional
	public String RegisterMember(MemberRegisterRequestDto requestDto) {
		return memberRepository.save(requestDto.toEntity()).getId();
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
		Member member = memberRepository.findById(requestDto.getId())
			.orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. 사용자 ID: " + requestDto.getId()));
		if (member.getDelFlag() != null) // error code: 500
			throw new IllegalArgumentException("해당 사용자는 탈퇴한 사용자입니다. 사용자 ID: " + requestDto.getId());
		else
			member.UpdateRating(requestDto.getAmount());
		return requestDto.getId();
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

}
