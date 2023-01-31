package com.function.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.common.PagingDto;
import com.function.board.service.BoardService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final BoardRepository boardRepository;

	@ApiOperation(value = "게시글 생성")
	@PostMapping()
	public Long save(@RequestBody BoardSaveRequestDto requestDto) {
		return boardService.save(requestDto);
	}

	@ApiOperation(value = "게시글 목록 조회")
	@GetMapping()
	public List<BoardListResponseDto> findAll() {
		return boardService.findAll();
	}

	@GetMapping("/page")
	public Page<PagingDto> paging(@PageableDefault(size = 5, sort = "title") Pageable pageable) {
		Page<Board> boardList = boardRepository.findAll(pageable);

		Page<PagingDto> pagingList = boardList.map(
			board -> PagingDto.builder()
				.id(board.getId())
				.title(board.getTitle())
				.content(board.getContent())
				.createdAt(board.getCreatedAt())
				.build());
		return pagingList;
	}

	@ApiOperation(value = "board_id로 게시글 조회")
	@GetMapping("/{id}")
	public BoardResponseDto findById(@PathVariable("id") Long id) {
		boardService.updateView(id);
		return boardService.findById(id);
	}

	@ApiOperation(value = "게시글 수정")
	@PutMapping("/{id}")
	public Long update(@PathVariable("id") Long id, @RequestBody BoardUpdateRequestDto requestDto) {
		return boardService.update(id, requestDto);
	}

	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Long id) {
		boardService.delete(id);
	}

}
