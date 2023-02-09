package com.function.board.dto.board;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ContentComponentDto {

	private List<String> content;
	private int startIndex;
	private int endIndex;

}
