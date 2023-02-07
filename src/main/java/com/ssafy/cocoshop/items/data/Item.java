package com.ssafy.cocoshop.items.data;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

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
@Entity
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned")
	private Long id;

	@Column(length = 100, nullable = false)
	private String itemName;

	@Column(nullable = false, columnDefinition = "int unsigned")
	private Integer price;

	@Column(length = 100, nullable = false)
	@ColumnDefault("\"CoCo 아이콘 팀\"")
	private String authorName;

	@Column(nullable = false)
	private String storedFileName;

	@Column(nullable = false)
	private String storedFilePath;

	@Column(columnDefinition = "int unsigned default 0")
	private Integer buyCount;

	@CreationTimestamp
	private LocalDateTime registerTime;

	private LocalDateTime sellEndTime;

}
