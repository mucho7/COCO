package com.function.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.dto.comment.CommentResponseDto;
import com.function.board.dto.comment.CommentSaveRequestDto;
import com.function.board.dto.comment.CommentUpdateRequestDto;
import com.function.board.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@ApiOperation(value = "댓글 생성")
	@PostMapping("/{board_id}/comment")
	public Long save(@PathVariable("board_id") Long boardId, @RequestBody CommentSaveRequestDto requestDto) {
		return commentService.save(boardId, requestDto);
	}

	@ApiOperation(value = "댓글 목록 조회")
	@GetMapping("/{board_id}/comment")
	public List<CommentResponseDto> findAll(@PathVariable("board_id") Long boardId) {
		return commentService.findAllByBoard(boardId);
	}

	@ApiOperation(value = "댓글 수정")
	@PutMapping("/{board_id}/comment/{comment_id}")
	public Long update(@PathVariable("comment_id") Long commentId,
		@RequestBody CommentUpdateRequestDto requestDto) {
		return commentService.update(commentId, requestDto);
	}

	@ApiOperation(value = "댓글 삭제")
	@DeleteMapping("/{board_id}/comment/{comment_id}")
	public void delete(@PathVariable("comment_id") Long commentId) {
		commentService.delete(commentId);
	}
}
