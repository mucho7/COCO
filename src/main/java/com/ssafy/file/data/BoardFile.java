package com.ssafy.file.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;
import lombok.Generated;

@Data
@Entity
@Table(name = "board_file")
public class BoardFile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="file_did")
	private Long id;
	@Column(name = "file_path")
	private String path;
	@Column(name="board_id")
	private Long boardId;

	@Builder
	public BoardFile(Long boardId, String path) {
		this.boardId = boardId;
		this.path = path;
	}

	public void update(Long id, String path) {
		this.boardId = boardId;
		this.path = path;
	}


}
