package com.function.board.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "fileService", url = "i8a703.p.ssafy.io:8019/file/board")
public interface BoardUploadServiceClient {

	@PostMapping(path = "/{id}")
	String uploadFile(@RequestBody MultipartFile file, @PathVariable Long id);

}
