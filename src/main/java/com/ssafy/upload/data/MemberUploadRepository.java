package com.ssafy.upload.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberUploadRepository extends JpaRepository<MemberUpload, Long> {

	Optional<MemberUpload> findByUserId(String userId);

}
