package com.function.board.dto.board;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Data;

@Data
public class BoardListResponseDto {
	private Long id;
	private String title;
	private String writer;
	private int commentCnt;
	private int hit;
	private LocalDateTime createdAt;

	@QueryProjection
	public BoardListResponseDto(Long id, int commentCnt, String title, String writer, int hit, LocalDateTime createdAt) {
		this.id = id;
		this.commentCnt = commentCnt;
		this.title = title;
		this.writer = writer;
		this.hit = hit;
		this.createdAt = createdAt;
	}

	public BoardListResponseDto(Board entity) {
		this.id = entity.getId();
		this.commentCnt = entity.getComments().size();
		this.title = entity.getTitle();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.createdAt = entity.getCreatedAt();
	}
}
