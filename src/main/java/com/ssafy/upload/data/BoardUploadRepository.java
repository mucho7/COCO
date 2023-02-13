package com.ssafy.upload.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardUploadRepository extends JpaRepository<BoardUpload, Long> {
	Optional<BoardUpload> findById(Long boardId);

}
