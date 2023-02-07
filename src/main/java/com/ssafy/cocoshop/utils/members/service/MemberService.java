package com.ssafy.cocoshop.utils.members.service;

import org.springframework.stereotype.Service;

import com.ssafy.cocoshop.utils.members.data.Member;
import com.ssafy.cocoshop.utils.members.data.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final MemberRepository memberRepository;

	public Member loadUserByUsername(String userId) {
		return memberRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("[" + userId + "] 사용자를 찾을 수 없습니다."));
	}

	public void updatePointByUsername(String userId, int amount) {
		Member member = memberRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("[" + userId + "] 사용자를 찾을 수 없습니다."));
		if (member.getDelFlag() != null) {// error code: 500
			throw new IllegalArgumentException("[" + userId + "] 사용자는 탈퇴한 사용자입니다.");
		} else {
			if (member.getRating() + amount < 0)
				throw new ArithmeticException("평판점수는 음수가 될 수 없습니다.");
			else {
				member.setRating(member.getRating() + amount);
			}
		}
	}

}