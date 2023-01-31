package com.function.board.dto.common;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
public class PagingDto {

	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;

	@Builder
	public PagingDto(Long id, String title, String content, LocalDateTime createdAt) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
	}
}
