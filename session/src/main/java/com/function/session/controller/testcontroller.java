package com.function.session.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
public class testcontroller {

	@GetMapping("/hello")
	public String hello(){
		return "session";
	}

}
