package com.ssafy.coco.api.controller;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ssafy.coco.api.dto.request.MemberDeleteRequestDto;
import com.ssafy.coco.api.dto.request.MemberRatingUpdateRequestDto;
import com.ssafy.coco.api.dto.request.MemberRegisterRequestDto;
import com.ssafy.coco.api.dto.request.MemberUpdateRequestDto;
import com.ssafy.coco.data.Member;
import com.ssafy.coco.data.MemberRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MemberControllerTest {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Autowired
	private MemberRepository memberRepository;

	@AfterEach
	public void TearDown() throws Exception {
		memberRepository.deleteAll();
	}

	@Test
	public void MemberRegisterTest() throws Exception {
		String userId = "ssafy";
		String password = "ssafy";
		String name = "김싸피";
		String email = "ssafy@ssafy.com";

		MemberRegisterRequestDto requestDto = MemberRegisterRequestDto.builder()
			.userId(userId)
			.password(password)
			.name(name)
			.email(email)
			.build();

		String url = "http://localhost:" + port + "/member";

		ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestDto, String.class);

		List<Member> all = memberRepository.findAll();

		assertThat(all.get(0).getUserId()).isEqualTo(userId);
		assertThat(all.get(0).getEmail()).isEqualTo(email);
		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void MemberUpdateTest() throws Exception {
		Member registeredMember = memberRepository.save(Member.builder()
			.userId("ssafy")
			.password("ssafy")
			.email("ssafy@ssafy.com")
			.name("김싸피")
			.build()
		);

		String targetId = registeredMember.getUserId();
		String expectedPassword = "";
		String expectedEmail = "ssafy_kim@ssafy.com";
		String expectedName = "김싸피";

		MemberUpdateRequestDto requestDto = MemberUpdateRequestDto.builder()
			.email(expectedEmail)
			.password((expectedPassword != null && !expectedPassword.equals("") ? expectedPassword :
				registeredMember.getPassword()))
			.name(expectedName)
			.build();

		String url = "http://localhost:" + port + "/member/" + targetId;

		HttpEntity<MemberUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		// assertThat(responseEntity.getBody()).isGreaterThan(0L);
		List<Member> all = memberRepository.findAll();
		assertThat(all.get(0).getEmail()).isEqualTo(expectedEmail);
		assertThat(all.get(0).getName()).isEqualTo(expectedName);
		assertThat(all.get(0).getPassword()).isEqualTo(registeredMember.getPassword());
		assertThat(all.get(0).getRole()).isEqualTo("user");
	}

	@Test
	public void MemberDeleteTest() throws Exception {
		Member registeredMember = memberRepository.save(Member.builder()
			.userId("ssafy")
			.password("ssafy")
			.email("ssafy@ssafy.com")
			.name("김싸피")
			.build()
		);

		Thread.sleep(2000); // 시간차 적용이 되는지 확인하기 위해 임의로 2초 딜레이 걸어둠.

		String targetId = registeredMember.getUserId();

		MemberDeleteRequestDto requestDto = MemberDeleteRequestDto.builder().time(LocalDateTime.now()).build();

		String url = "http://localhost:" + port + "/member/delete/" + targetId;

		HttpEntity<MemberDeleteRequestDto> requestEntity = new HttpEntity<>(requestDto);

		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		List<Member> all = memberRepository.findAll();
		assertThat(all.get(0).getDelFlag()).isNotNull();
		System.out.println(all.get(0));
	}

	@Test
	public void MemberRatingUpdateTest() throws Exception {
		Member registeredMember = memberRepository.save(Member.builder()
			.userId("ssafy")
			.password("ssafy")
			.email("ssafy@ssafy.com")
			.name("김싸피")
			.build()
		);

		Integer amount = 12;

		String targetId = registeredMember.getUserId();

		MemberRatingUpdateRequestDto requestDto = MemberRatingUpdateRequestDto.builder()
			.userId(targetId)
			.amount(amount)
			.build();

		String url = "http://localhost:" + port + "/member/rating";

		HttpEntity<MemberRatingUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

		ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
		List<Member> all = memberRepository.findAll();
		assertThat(all.get(0).getRating()).isEqualTo(amount);
	}

	// @Test
	// public void
}
