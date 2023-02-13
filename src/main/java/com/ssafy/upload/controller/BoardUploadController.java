package com.ssafy.upload.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.upload.service.UploadService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@SuppressWarnings("checkstyle:RegexpMultiline")
@Api(tags = "게시판 이미지 업로드 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/upload/board")
public class BoardUploadController {

	private final UploadService uploadService;

	@ApiOperation(value = "게시글 이미지 불러오기", notes = "게시글 번호에 해당하는 이미지를 가져옵니다.")
	@GetMapping("/{id}")
	public UrlResource getBoardImage(@PathVariable @ApiParam(value = "게시글 번호", required = true) long id) {
		return uploadService.getBoardImage(id);
	}

	// 파일 이미지 업로드 관련 참고
	// https://velog.io/@pyo-sh/Spring-Boot-%ED%8C%8C%EC%9D%BC%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
	@ApiOperation(value = "게시글 이미지 저장", notes = "사용자가 등록한 게시글의 이미지 파일을 서버에 저장합니다.")
	@PostMapping(path = "/{id}", consumes = {"multipart/form-data"})
	public long uploadBoardImage(@RequestPart MultipartFile boardImage, @PathVariable Long id) throws Exception {
		System.out.println("업로드한 이미지가 포함된 게시글 번호: " + id);
		return uploadService.uploadBoardImage(id, boardImage);
	}

	@ApiOperation(value = "게시판 이미지 수정", notes = "사용자가 등록한 게시판의 이미지 파일을 변경 또는 추가합니다.")
	@PutMapping(path = "/{id}", consumes = {"multipart/form-data"})
	public long updateBoardImage(@RequestPart MultipartFile boardImage, @PathVariable Long id) throws Exception {
		System.out.println("변경할 이미지가 포함된 게시글 번호: " + id);
		return uploadService.updateBoardImage(id, boardImage);
	}
}
