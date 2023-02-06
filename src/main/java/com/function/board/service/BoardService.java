package com.function.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.board.domain.board.Board;
import com.function.board.domain.board.BoardRepository;
import com.function.board.domain.comment.Comment;
import com.function.board.domain.comment.CommentRepository;
import com.function.board.dto.board.BoardDetailTransferDto;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.board.ContentComponentDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

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
	public BoardResponseDto findById(Long boardId, Pageable pageable) {
		Board entity = boardRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

		String[] content = entity.getContent().split("\n");
		String[] code = entity.getCode().split("\n");


		BoardDetailTransferDto boardDetail = new BoardDetailTransferDto();


		List<ContentComponentDto> contentList = new ArrayList<>();
		List<ContentComponentDto> codeList = new ArrayList<>();

		ContentComponentDto contentComponent = new ContentComponentDto();
		ContentComponentDto codeComponent = new ContentComponentDto();


		StringBuilder sbContent = new StringBuilder();
		StringBuilder sbCode = new StringBuilder();



		int codeIndex = 0;

		int start;
		int end;



		for(String c : content) {

			//1. 블록 구문 검사
			if () {

				//2. 컴포넌트에 담고 리스트에 추가
				contentComponent.setContent(sbContent.toString());
				contentComponent.setIndex(codeList.size());

				//3. 코드도 잘라서 인덱스 매핑
				while (codeIndex != start)
					codeIndex++;

				while (codeIndex + 1 != end) {

					sbCode.append(code[codeIndex]);
					codeIndex++;
				}

				codeComponent.setContent(sbCode.toString());
				codeComponent.setIndex(contentList.size());

				//4. 리스트 추가
				contentList.add(contentComponent);
				codeList.add(codeComponent);

			}
		}

		boardDetail.setContent(contentList);
		boardDetail.setContent(codeList);


		Page<Comment> comments = commentRepository.findAllByBoardId(boardId, pageable);
			// .map(CommentResponseDto::new);
		return new BoardResponseDto(entity, comments);
	}

	// @Transactional(readOnly = true)

	// public Page<Board> searchByTitle(String keyword, Pageable pageable) {
	// 	return boardRepository.findByTitleContaining(keyword, pageable);
	// }

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
