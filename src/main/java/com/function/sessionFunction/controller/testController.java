package com.function.sessionFunction.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sessionFunction")
public class testController {

	@GetMapping("/hello")
	public String hello(){
		return "sessionFunction";
	}

}
