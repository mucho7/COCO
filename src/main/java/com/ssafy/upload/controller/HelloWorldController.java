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
@Api(tags = "정상 작동 확인용 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/upload/hello")
public class HelloWorldController {

	@ApiOperation(value = "Hello", notes = "CI/CD 정상 동작 테스트를 위한 API")
	@GetMapping
	public String hello() {
		return "uploadServer";
	}
}
