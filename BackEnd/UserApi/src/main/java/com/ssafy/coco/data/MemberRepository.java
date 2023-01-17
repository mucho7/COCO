package com.ssafy.coco.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

	Long countBy();

	Long countByEmail(String email);

	Long countById(String id);

	@Override
	Optional<Member> findById(String id);
}
