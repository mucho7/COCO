package com.ssafy.coco.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.model.service.RoomService;

@RequestMapping("/room")
@RestController
public class RoomController {
	@Autowired
	private RoomService roomService;

	@GetMapping("/test")
	public String getTest() {
		return "test";
	}

	// @PostMapping
	// protected ResponseEntity<?> insertRoom(@RequestBody Room room) {
	// 	boolean result = roomService.insertRoom(room);
	// }

}
