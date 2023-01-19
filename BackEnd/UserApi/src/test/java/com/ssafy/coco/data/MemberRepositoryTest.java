package com.ssafy.coco.data;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MemberRepositoryTest {
	@Autowired
	MemberRepository memberRepository;

	@AfterEach
	public void cleanup() {
		memberRepository.deleteAll();
	}

	@Test
	public void SignInTest() {
		// 아래 테스트 값은 자신이 DB에 넣고자 하는 값과 데이터 타입에 따라 유동적으로 수정해서 넣으시면 됩니다.
		String id = "ssafy2";
		String password = "ssafy";
		String name = "김싸피";
		String email = "ssafy2@ssafy.com";

		memberRepository.save(Member.builder()
			.id(id)
			.password(password)
			.name(name)
			.email(email)
			.build()
		);

		List<Member> all = memberRepository.findAll();

		Member member = all.get(0);

		assertThat(member.getUserId()).isEqualTo(id);
	}

}
