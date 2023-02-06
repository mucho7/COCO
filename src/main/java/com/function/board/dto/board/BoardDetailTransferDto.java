package com.function.board.dto.board;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import com.function.board.domain.board.Board;
import com.function.board.domain.comment.Comment;
import com.function.board.dto.comment.CommentResponseDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardDetailTransferDto {


	private long id;
	private LocalDateTime createdAt;
	private Page<CommentResponseDto> comments;
	private String title;
	private List<ContentComponentDto> content;
	private String writer;
	private int hit = 0;
	private List<ContentComponentDto> code;

	public BoardDetailTransferDto(BoardDetailTransferDto entity, Page<Comment> comments) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.writer = entity.getWriter();
		this.hit = entity.getHit();
		this.code = entity.getCode();
		this.createdAt = entity.getCreatedAt();
		this.comments = comments.map(CommentResponseDto::new);
	}

}
