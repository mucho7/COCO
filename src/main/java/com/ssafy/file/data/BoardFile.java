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
	@Column(name="id")
	private Long id;
	@Column(name = "filename")
	private String name;

	@Builder
	public BoardFile(Long boardId, String name) {
		this.id = id;
		this.name = name;
	}

	public void update(Long id, String name) {
		this.id = id;
		this.name = name;
	}


}
