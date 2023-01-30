package com.function.board.dto.board;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;

import lombok.Getter;

@Getter
public class BoardListResponseDto {
	private final String title;
	private final String writer;
	private final int hit;
	private final LocalDateTime createdAt;

	public BoardListResponseDto(Board entity) {
		this.title = entity.getTitle();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.createdAt = entity.getCreatedAt();
	}
}
