package com.ssafy.cocoshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
public class CoCoShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoCoShopApplication.class, args);
	}

	// DispathcerServlet에게 멀티파트 요청이 올경우 파일 업로드 처리가 될 수 있도록 MultipartResolver객체를 등록.
	@Bean
	public MultipartResolver multipartResolver() {
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setMaxUploadSize(10485760); // 1024 * 1024 * 5 -> 5MB
		return multipartResolver;
	}

}
