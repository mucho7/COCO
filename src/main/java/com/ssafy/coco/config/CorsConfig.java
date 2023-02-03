package com.ssafy.coco.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Bean
	public CorsFilter corsFilter() {

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		// config.addAllowedOrigin("*");
		config.addAllowedOriginPattern("*"); // addAllowedOriginPattern("*") 대신 사용
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		config.setExposedHeaders(Collections.singletonList("*"));
		config.addExposedHeader("*");
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}

}
