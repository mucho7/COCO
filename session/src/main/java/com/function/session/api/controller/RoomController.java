package com.function.session.api.controller;

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

import com.function.session.api.dto.request.RoomRegisterRequestDto;
import com.function.session.api.dto.request.RoomUpdateRequestDto;
import com.function.session.api.dto.response.RoomDetailResponseDto;
import com.function.session.api.service.RoomService;
import com.function.session.data.Room;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/room")
public class RoomController {
	@Autowired
	private RoomService roomService;

	@GetMapping
	@ApiOperation(value = "세션 방 목록 조회")
	public List<Room> GetRoomList(@RequestParam String mode, @RequestParam(required = false) String hostId,
		@RequestParam(required = false) String title) {
		return roomService.GetRoomList(mode, hostId, title);
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "세션 방 상세 보기")
	public RoomDetailResponseDto findById(@PathVariable String id) {
		return roomService.findByRoomId(id);
	}

	@PostMapping
	@ApiOperation(value = "세션 방 생성")
	public String RegisterRoom(@RequestBody RoomRegisterRequestDto requestDto) {
		return roomService.RegisterRoom(requestDto);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "세션 방 수정")
	public String UpdateRoom(@PathVariable String id, @RequestBody RoomUpdateRequestDto requestDto) {
		return roomService.UpdateRoom(requestDto, id);
	}

	@PutMapping("/enter/{id}") // "/room/enter/{id}?userId={userId}"
	@ApiOperation(value = "세션 방 입장", notes = "- 호스트가 입장하면, is_live가 1이 된다.\n"
		+ "- 일반 사용자가 입장을 시도하면, (is_live == 1) && (참여자수 < max) 일때만 입장가능하다.\n"
		+ "- 참여자수 + 1")
	public String UpdateRoomEnter(@PathVariable String id, @RequestParam String userId) {
		return roomService.UpdateRoomEnter(id, userId);
	}

	@PutMapping("/leave/{id}")
	@ApiOperation(value = "세션 방 나가기", notes = "참여자수 - 1")
	public String UpdateRoomLeave(@PathVariable String id) {
		return roomService.UpdateRoomLeave(id);
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "세션 방 삭제")
	public String DeleteRoom(@PathVariable String id) {
		return roomService.DeleteRoom(id);
	}
}
