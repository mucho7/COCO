package com.service.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;

import com.service.gateway.tokens.JwtAuthenticationFilter;
import com.service.gateway.tokens.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		http.csrf()
			.disable();
		http.authorizeExchange()
			// .pathMatchers("/swagger*/**", "/login", "/check/**", "/member/register", "/token", "/sendEmail", "/tempPassword")
			// .permitAll()
			.pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
			.pathMatchers("/member/info/**", "/member/rating", "/member/extract", "/logout")
			.authenticated();
		return http.build();
	}

	// @Bean
	// public SecurityWebFilterChain filterChain(ServerHttpSecurity http) {
	// 	http
	// 		.httpBasic()
	// 		.disable()
	// 		.csrf()
	// 		.disable()
	// 		.sessionManagement()
	// 		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	// 		.and()
	// 		.authorizeRequests()
	// 		// .antMatchers("/swagger*/**", "/login", "/check/**", "/member/register", "/token", "/sendEmail", "/tempPassword")
	// 		// .permitAll()
	// 		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	// 		.antMatchers("/member/info/**", "/member/rating", "/member/extract", "/logout")
	// 		.authenticated()
	// 		.anyRequest().permitAll()
	// 		.and()
	// 		.logout()
	// 		.logoutUrl("/logout")
	// 		.logoutSuccessUrl("/") // Front와 연동 성공시 로그아웃 이후 연결 페이지 합의 볼 것.
	// 		.invalidateHttpSession(true)
	// 		.and()
	// 		.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
	// 			UsernamePasswordAuthenticationFilter.class);
	// 	return http.build();
	// }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
}
