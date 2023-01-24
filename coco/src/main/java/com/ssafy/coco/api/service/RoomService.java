package com.ssafy.coco.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ssafy.coco.api.dto.request.RoomRegisterRequestDto;
import com.ssafy.coco.api.dto.request.RoomUpdateRequestDto;
import com.ssafy.coco.api.dto.response.RoomDetailResponseDto;
import com.ssafy.coco.data.Room;
import com.ssafy.coco.data.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
	private final RoomRepository roomRepository;

	@Transactional
	public String RegisterRoom(RoomRegisterRequestDto requestDto) {
		return roomRepository.save(requestDto.toEntity()).getRoomId();
	}

	//
	// public List<Room> getRoomList() {
	// 	return roomRepository.findAll();
	// }
	public List<Room> ReadRoom(String mode, String hostId, String title) {
		Specification<Room> spec = Specification.where(RoomSpecification.equalMode(mode));
		if (hostId != null) {
			spec = spec.and(RoomSpecification.equalHostId(hostId));
		}
		if (title != null) {
			spec = spec.and(RoomSpecification.likeTitle(title));
		}

		return roomRepository.findAll(spec);
	}

	public RoomDetailResponseDto findByRoomId(String roomId) {
		Room entity = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId));

		return new RoomDetailResponseDto(entity);
	}

	@Transactional
	public String UpdateRoom(RoomUpdateRequestDto requestDto, String roomId) {
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId));
		room.UpdateRoom(requestDto.getTitle(), requestDto.getContent(), requestDto.getMode(), requestDto.getIsLive(),
			requestDto.getNumberUsers(), requestDto.getMax());
		return roomId;
	}

	@Transactional
	public String DeleteRoom(String roomId) {
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId));
		roomRepository.deleteById(roomId);
		return roomId;
	}

}
