package com.function.board.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.domain.comment.Comment;
import com.function.board.domain.comment.CommentRepository;
import com.function.board.dto.comment.CommentResponseDto;
import com.function.board.dto.comment.CommentSaveRequestDto;
import com.function.board.dto.comment.CommentUpdateRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;

	@Transactional
	public Long save(Long boardId, CommentSaveRequestDto requestDto) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

		Comment comment = Comment.builder()
			.board(board)
			.writer(requestDto.getWriter())
			.content(requestDto.getContent())
			.build();
		commentRepository.save(comment);
		return comment.getId();
	}

	// @Transactional(readOnly = true)
	// public List<CommentResponseDto> findAllByBoard(Long boardId) {
	// 	Board board = boardRepository.findById(boardId)
	// 		.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
	//
	// 	List<Comment> comments = board.getComments();
	// 	return comments.stream()
	// 		.map(CommentResponseDto::new)
	// 		.collect(Collectors.toList());
	// }

	// @Transactional(readOnly = true)
	// public Page<CommentResponseDto> findAllByBoardPaging(Long boardId, Pageable pageable) {
	// 	boardRepository.findById(boardId)
	// 		.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
	//
	// 	return commentRepository.findAllByBoardId(boardId, pageable)
	// 		.map(CommentResponseDto::new);
	// }

	public CommentResponseDto findById(Long commentId) {
		Comment entity = commentRepository.findById(commentId)
			.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다."));
		return new CommentResponseDto(entity);
	}

	@Transactional
	public Long update(Long commentId, CommentUpdateRequestDto requestDto) {
		Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
			new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));

		comment.update(requestDto.getContent());
		return commentId;
	}

	@Transactional
	public void delete(Long commentId) {
		var comment = commentRepository.findById(commentId).orElseThrow(() ->
			new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));
		commentRepository.delete(comment);
	}
}
