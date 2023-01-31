package com.function.board.dto.board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.function.board.domain.board.Board;
import com.function.board.dto.comment.CommentResponseDto;

import lombok.Getter;

@Getter
public class BoardResponseDto {
	private final String title;
	private final String content;
	private final String writer;
	private final int hit;
	private final String code;
	private final LocalDateTime createdAt;
	private final List<CommentResponseDto> comments;

	public BoardResponseDto(Board entity) {
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.code = entity.getCode();
		this.createdAt = entity.getCreatedAt();
		this.comments = entity.getComments()
			.stream()
			.map(CommentResponseDto::new)
			.collect(Collectors.toList());
	}

}
