package com.function.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
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
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardSearchCondition;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.board.ContentComponentDto;
import com.function.board.exception.InvalidInputException;
import com.function.board.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

	@Transactional
	public Long save(BoardSaveRequestDto requestDto) {
		if(requestDto.getContent().length() > 3000) {
			throw new InvalidInputException("내용은 3000자를 넘을 수 없습니다.");
		}
		return boardRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional(readOnly = true)
	public Page<BoardListResponseDto> paging(Pageable pageable) {
		return boardRepository.findAll(pageable)
			.map(BoardListResponseDto::new);
	}

	@Transactional(readOnly = true)
	public Page<BoardListResponseDto> searchPage(BoardSearchCondition condition, Pageable pageable) {
		return boardRepository.searchPage(condition, pageable);
	}

	@Transactional(readOnly = true)
	public List<BoardListResponseDto> findAll() {
		return boardRepository.findAll().stream()
			.map(BoardListResponseDto::new)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public BoardDetailTransferDto findById(Long boardId, Pageable pageable) {
		Board entity = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 없습니다."));

		BoardDetailTransferDto detailDto = convertComponent(entity);
		Page<Comment> comments = commentRepository.findAllByBoardId(boardId, pageable);
		return new BoardDetailTransferDto(entity, detailDto, comments);
	}

	@Transactional
	public Long update(Long boardId, BoardUpdateRequestDto requestDto) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 없습니다."));

		if(requestDto.getContent().length() > 3000) {
			throw new InvalidInputException("내용은 3000자를 넘을 수 없습니다.");
		}

		board.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getCode());
		return boardId;
	}

	@Transactional
	public void delete(Long boardId) {
		var board = boardRepository.findById(boardId)
			.orElseThrow(() -> new ResourceNotFoundException("해당 게시글이 존재하지 않습니다."));
		boardRepository.delete(board);
	}

	@Transactional
	public int updateView(Long boardId) {
		return boardRepository.updateView(boardId);
	}

	@Transactional
	public BoardDetailTransferDto convertComponent(Board board) {
		String[] content = board.getContent().split("\n");

		BoardDetailTransferDto detailDto = new BoardDetailTransferDto();

		List<ContentComponentDto> contents = new ArrayList<>();
		List<String> codeList = new ArrayList<>();
		for(String c : board.getCode().split("\n")){
			codeList.add(c);
		}

		ContentComponentDto contentComponent;

		List<String> contentList = new ArrayList<>();

		int codeIndex = 0;
		boolean isFirst = true;

		//0-4. 검색 패턴 설정(---[숫자])
		String pattern = "^\\---\\d{1,3}";

		int startIndex = 0;
		int endIndex = 0;
		int num = 0;
		for(String c : content) {
			System.out.println(num++);
			//1. 블록 구문 검사
			if(Pattern.matches(pattern, c)) {
				//시작과 끝 인덱스 지정
				if(isFirst) {
					startIndex = Integer.parseInt(c.replace("---", ""))-1;
					isFirst = false;

					//저장할 내용이 있으니깐
					if(contentList.size() != 0){
						contentComponent = new ContentComponentDto();
						contentComponent.setContent(contentList);
						contentComponent.setStartIndex(-1);
						contentComponent.setEndIndex(-1);
						contents.add(contentComponent);

						contentList = new ArrayList<>();
					}
				}
				else {
					endIndex = Integer.parseInt(c.replace("---", ""))-1;

					if(endIndex < startIndex){
						isFirst = true;
						continue;
					}


					isFirst = true;

					contentComponent = new ContentComponentDto();

					//2. 컴포넌트에 담고 리스트에 추가
					contentComponent.setContent(contentList);
					contentComponent.setStartIndex(startIndex);
					contentComponent.setEndIndex(endIndex);
					contentList = new ArrayList<>();

					//4. 리스트 추가
					contents.add(contentComponent);
				}
			}
			else {
				//contentList에 한 줄씩 넣는 과정
				contentList.add(c);
			}
		}

		if(contentList.size() != 0) {
			contentComponent = new ContentComponentDto();
			contentComponent.setContent(contentList);
			contentComponent.setStartIndex(-1);
			contentComponent.setEndIndex(-1);
			contents.add(contentComponent);
		}


		for(ContentComponentDto c : contents) {
			System.out.println(c);
		}

		detailDto.setContent(contents);
		detailDto.setCode(codeList);

		return detailDto;
	}

}
