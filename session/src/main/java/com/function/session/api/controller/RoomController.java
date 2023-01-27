package com.function.session.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.session.api.dto.request.RoomRegisterRequestDto;
import com.function.session.api.dto.request.RoomUpdateRequestDto;
import com.function.session.api.dto.response.RoomDetailResponseDto;
import com.function.session.api.service.RoomService;
import com.function.session.data.Room;

// @RequestMapping("/room")
@RestController
public class RoomController {
	@Autowired
	private RoomService roomService;

	@GetMapping("/session/hello")
	public String hello() {
		return "session";
	}

	@GetMapping("/room")
	public List<Room> GetRoomList(@RequestParam String mode, @RequestParam(required = false) String hostId,
		@RequestParam(required = false) String title) {
		return roomService.GetRoomList(mode, hostId, title);
	}

	@GetMapping("/room/{id}")
	public RoomDetailResponseDto findById(@PathVariable String id) {
		return roomService.findByRoomId(id);
	}

	@PostMapping("/room")
	public String RegisterRoom(@RequestBody RoomRegisterRequestDto requestDto) {
		return roomService.RegisterRoom(requestDto);
	}

	@PutMapping("/room/{id}")
	public String UpdateRoom(@PathVariable String id, @RequestBody RoomUpdateRequestDto requestDto) {
		return roomService.UpdateRoom(requestDto, id);
	}

	@PutMapping("/room/{id}/{userId}")
	public String UpdateRoomEnter(@PathVariable String id, @PathVariable String userId) {
		return roomService.UpdateRoomEnter(id, userId);
	}

	@PutMapping("/room/{id}/leave")
	public String UpdateRoomLeave(@PathVariable String id) {
		return roomService.UpdateRoomLeave(id);
	}

	@DeleteMapping("/room/{id}")
	public String DeleteRoom(@PathVariable String id) {
		return roomService.DeleteRoom(id);
	}
}
