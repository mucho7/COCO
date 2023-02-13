package com.ssafy.upload.utils.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@SuppressWarnings("unchecked")
public class SwaggerConfig {
	//  Swagger-UI 2.x 확인
	//	http://localhost:8080/swagger-ui.html

	private String version = "0.0.1-SNAPSHOT";
	private String title = "CoCo 이미지 업로드 백엔드 API 테스트";

	private ApiInfo apiInfo() {
		String descript = "CoCo 평판상점 백엔드 API 테스트 환경<br/>";
		// CoCo 로고 들어가면 여기에 넣기
		// descript += "<img src=\"http://localhost:9999/vue/static/assets/img/ssafy_logo.png\">";
		return new ApiInfoBuilder()
			.title(title)
			.description(descript)
			.contact(new Contact("CoCo", "https://edu.ssafy.com", "ssafy@ssafy.com"))
			.license("SSAFY License")
			.licenseUrl("ssafy@ssafy.com")
			.version(version)
			.build();
	}

	@Bean
	public Docket allApi() {
		return getDocket("전체", Predicates.or(PathSelectors.regex("/*.*")));
	}

	public Docket getDocket(String groupName, Predicate<String> predicate) {
		return new Docket(DocumentationType.SWAGGER_2)
			.groupName(groupName)
			.apiInfo(apiInfo())
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.ssafy.upload"))
			.paths(predicate)
			.apis(RequestHandlerSelectors.any())
			.build();
	}

	// swagger ui 설정.
	@Bean
	public UiConfiguration uiConfig() {
		return UiConfigurationBuilder.builder().displayRequestDuration(true).validatorUrl("").build();
	}

	private SecurityContext securityContext() {
		return SecurityContext
			.builder()
			.forPaths(PathSelectors.any()).build();
	}

}
