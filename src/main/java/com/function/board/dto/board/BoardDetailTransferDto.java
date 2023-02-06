package com.function.board.dto.board;

import java.util.ArrayList;
import java.util.List;

import com.function.board.domain.comment.Comment;

import lombok.Data;

@Data
public class BoardDetailTransferDto {


	private final List<Comment> comments = new ArrayList<>();
	private String title;
	private List<ContentComponentDto> content;
	private String writer;
	private int hit = 0;
	private List<ContentComponentDto> code;

}
