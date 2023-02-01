package com.function.board.dto.board;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;

import lombok.Data;

@Data
public class BoardListResponseDto {
	private String title;
	private String writer;
	private int hit;
	private LocalDateTime createdAt;

	public BoardListResponseDto(Board entity) {
		this.title = entity.getTitle();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.createdAt = entity.getCreatedAt();
	}
}
