package com.function.board.dto.common;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;

import lombok.Builder;
import lombok.Data;

@Data
public class PagingDto {

	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;

	@Builder
	public PagingDto(Board entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.createdAt = entity.getCreatedAt();
	}
}
