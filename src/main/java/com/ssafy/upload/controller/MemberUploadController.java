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
@Api(tags = "프로필 이미지 업로드 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/upload/member")
public class MemberUploadController {

	private final UploadService uploadService;

	@ApiOperation(value = "프로필 이미지 가져오기", notes = "사용자가 등록한 프로필 이미지 파일을 불러옵니다.")
	@GetMapping("/{id}")
	public UrlResource getMemberImage(@PathVariable @ApiParam(value = "사용자 ID", required = true) String id) {
		return uploadService.getMemberImage(id);
	}

	// 파일 이미지 업로드 관련 참고
	// https://velog.io/@pyo-sh/Spring-Boot-%ED%8C%8C%EC%9D%BC%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
	@ApiOperation(value = "프로필 이미지 등록", notes = "사용자의 프로필 이미지를 서버에 등록합니다.")
	@PostMapping(path = "/{id}", consumes = {"multipart/form-data"})
	public long uploadUserImage(@RequestPart MultipartFile userImage, @PathVariable String id) throws Exception {
		System.out.println("프로필 이미지를 등록하는 사용자 ID: " + id);
		return uploadService.uploadMemberImage(id, userImage);
	}

	@ApiOperation(value = "프로필 이미지 수정", notes = "사용자의 프로필 이미지를 변경 또는 추가합니다.")
	@PutMapping(path = "/{id}", consumes = {"multipart/form-data"})
	public long updateUserImage(@RequestPart MultipartFile userImage, @PathVariable String id) throws Exception {
		System.out.println("프로필 이미지를 변경하는 사용자 ID: " + id);
		return uploadService.updateMemberImage(id, userImage);
	}


}
