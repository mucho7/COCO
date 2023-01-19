package com.ssafy.coco.data.room;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ssafy.coco.data.Room;
import com.ssafy.coco.data.RoomRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RoomRepositoryTest {

	@Autowired
	RoomRepository roomRepository;

	@After("")
	public void cleanup() {
		roomRepository.deleteAll();
	}

	@Test
	public void post_save() {

		String roomId = "host78";
		String hostId = "host78";

		roomRepository.save(
			Room.builder()
				.roomId(roomId)
				.hostId(hostId)
				.build()
		);

		List<Room> roomList = roomRepository.findAll();

		Room room = roomList.get(0);
		assertThat(room.getRoomId()).isEqualTo(roomId);
		assertThat(room.getHostId()).isEqualTo(hostId);
	}
}
