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

	public List<Room> GetRoomList(String mode, String hostId, String title) {
		Specification<Room> spec = Specification.where(RoomSpecification.equalMode(mode));

		if (hostId != null && hostId.length() != 0) {
			spec = spec.and(RoomSpecification.equalHostId(hostId));
		}
		if (title != null && title.length() != 0) {
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
	public String RegisterRoom(RoomRegisterRequestDto requestDto) {
		return roomRepository.save(requestDto.toEntity()).getRoomId();
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
	public String UpdateRoomEnter(String roomId, String userId) {
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId));

		if (room.getHostId().equals(userId)) { // 호스트가 방에 입장할 때
			room.UpdateRoomIsLive();
			room.UpdateRoomNumberUsers(1);
		} else { // 일반 사용자가 방에 입장할 때
			if (room.getNumberUsers() >= room.getMax()) { // error code: 500
				throw new IllegalArgumentException("꽉찬 방입니다.");
			} else if (room.getIsLive() == 0) { // error code: 500
				throw new IllegalArgumentException("호스트가 아직 입장하지 않았습니다.");
			} else { // 입장하기
				room.UpdateRoomNumberUsers(1);
			}
		}

		return userId;
	}

	@Transactional
	public String UpdateRoomLeave(String roomId) {
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new IllegalArgumentException("해당 방은 없습니다. 방 ID: " + roomId));

		room.UpdateRoomNumberUsers(-1);

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
