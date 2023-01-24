package com.ssafy.coco.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoomRepository extends JpaRepository<Room, String>, JpaSpecificationExecutor<Room> {
	// public List<RoomDto>

	// Long ();
}
