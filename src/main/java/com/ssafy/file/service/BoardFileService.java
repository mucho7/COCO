package com.ssafy.file.service;

import java.io.File;
import java.io.IOException;

import javax.transaction.Transactional;

import org.eclipse.jdt.core.compiler.InvalidInputException;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.file.data.BoardFile;
import com.ssafy.file.data.BoardFileRepository;

import lombok.RequiredArgsConstructor;
import lombok.Value;

@Service
@RequiredArgsConstructor
public class BoardFileService {


	private final BoardFileRepository boardFileRepository;
	private final String path = "/app/data/boardItem";
	@Transactional
	public Long save(long id, MultipartFile file) {
		if(file.getSize() <1024*1000*10) {
			return (long)-1;
		}

		try {
			file.transferTo(new File(path));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		BoardFile boardfile = new BoardFile(id,file.getName());
		return boardFileRepository.save(boardfile).getId();
	}

	@Transactional
	public Resource findByBoardId(Long boardId) {
		BoardFile boardfile = boardFileRepository.findByBoardId(boardId);
		String path = boardfile.getPath();

		//path로 파일 찾아서 리소스 불러고 리턴
		Resource resource = new ClassPathResource("path/to/image.jpg");
		return resource;
	}
}
