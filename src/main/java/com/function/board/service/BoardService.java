package com.function.board.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardUpdateRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;

	@Transactional
	public Long save(BoardSaveRequestDto requestDto) {
		return boardRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional(readOnly = true)
	public List<BoardListResponseDto> findAll() {
		return boardRepository.findAll().stream()
			.map(BoardListResponseDto::new)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public BoardResponseDto findById(Long boardId) {
		Board entity = boardRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
		return new BoardResponseDto(entity);
	}
	@Transactional(readOnly = true)
	public Page<Board> searchByTitle(String keyword, Pageable pageable) {
		return boardRepository.findByTitleContaining(keyword, pageable);
	}

	@Transactional
	public Long update(Long boardId, BoardUpdateRequestDto requestDto) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

		board.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getCode());
		return boardId;
	}

	@Transactional
	public void delete(Long boardId) {
		var board = boardRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
		boardRepository.delete(board);
	}

	@Transactional
	public int updateView(Long boardId) {
		return boardRepository.updateView(boardId);
	}

}
