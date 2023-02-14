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
	@Column(name="id")
	private int id;
	@Column(name = "filename")
	private String name;

	@Builder
	public BoardFile(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public void update(int id, String name) {
		this.id = id;
		this.name = name;
	}


}
