package com.ssafy.coco.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.coco.api.dto.request.RoomRegisterRequestDto;
import com.ssafy.coco.api.dto.request.RoomUpdateRequestDto;
import com.ssafy.coco.api.dto.response.RoomDetailResponseDto;
import com.ssafy.coco.api.service.RoomService;
import com.ssafy.coco.data.Room;

@RequestMapping("/room")
@RestController
public class RoomController {
	@Autowired
	private RoomService roomService;

	// @GetMapping("/test")
	// public String getTest() {
	// 	return "test";
	// }

	// @GetMapping
	// protected ResponseEntity<?> insertRoom() {
	// 	return ResponseEntity.ok(roomService.getRoomList());
	// }

	@GetMapping
	public List<Room> GetRoomList(@RequestParam String mode, @RequestParam(required = false) String hostId,
		@RequestParam(required = false) String title) {
		return roomService.GetRoomList(mode, hostId, title);
	}

	@GetMapping("/{id}")
	public RoomDetailResponseDto findById(@PathVariable String id) {
		return roomService.findByRoomId(id);
	}

	@PostMapping
	public String RegisterRoom(@RequestBody RoomRegisterRequestDto requestDto) {
		return roomService.RegisterRoom(requestDto);
	}

	@PutMapping("/{id}")
	public String UpdateRoom(@PathVariable String id, @RequestBody RoomUpdateRequestDto requestDto) {
		return roomService.UpdateRoom(requestDto, id);
	}

	@PutMapping("/{id}/{userId}")
	public String UpdateRoomEnter(@PathVariable String id, @PathVariable String userId) {
		return roomService.UpdateRoomEnter(id, userId);
	}

	@PutMapping("/{id}/leave")
	public String UpdateRoomLeave(@PathVariable String id) {
		return roomService.UpdateRoomLeave(id);
	}

	@DeleteMapping("/{id}")
	public String DeleteRoom(@PathVariable String id) {
		return roomService.DeleteRoom(id);
	}
}
