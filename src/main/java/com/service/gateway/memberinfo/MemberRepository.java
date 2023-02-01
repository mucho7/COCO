package com.service.gateway.memberinfo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.gateway.memberinfo.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByUserId(String id);

}
