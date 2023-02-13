package com.ssafy.upload.data;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@DynamicInsert
@Entity
public class BoardUpload {
	@Id
	@Column(columnDefinition = "int unsigned")
	private Long id;

	@Column(nullable = false)
	private String storedFileName;

	@Column(nullable = false)
	private String storedFilePath;

}
