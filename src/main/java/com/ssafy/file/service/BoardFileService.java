package com.ssafy.file.service;

import java.io.File;
import java.io.IOException;

import javax.transaction.Transactional;

import org.eclipse.jdt.core.compiler.InvalidInputException;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
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
	public int save(int id, MultipartFile file) {

		try {
			file.transferTo(new File(path+"/"+file.getOriginalFilename()));
		} catch (IOException e) {
			System.out.println(e);
			throw new RuntimeException(e);
		}
		BoardFile boardfile = new BoardFile(id,file.getOriginalFilename());
		return boardFileRepository.save(boardfile).getId();
	}

	@Transactional
	public Resource findByBoardId(int id) {
		BoardFile boardfile = boardFileRepository.findById(id);
		String name = boardfile.getName();
		Resource resource = new FileSystemResource(path+"/" + name);
		return resource;
	}
}
