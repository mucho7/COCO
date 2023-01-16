package com.ssafy.coco.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {

	Long countBy();

	Long countByEmail(String email);

	Long countById(String id);

}
