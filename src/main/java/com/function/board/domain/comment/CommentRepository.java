package com.function.board.domain.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.function.board.domain.board.Board;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findAllByBoard(Board board);
}
