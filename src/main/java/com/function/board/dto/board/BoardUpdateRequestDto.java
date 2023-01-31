package com.function.board.dto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardUpdateRequestDto {
	private String title;
	private String content;
	private String code;

	@Builder
	public BoardUpdateRequestDto(String title, String content, String code) {
		this.title = title;
		this.content = content;
		this.code = code;
	}
}
