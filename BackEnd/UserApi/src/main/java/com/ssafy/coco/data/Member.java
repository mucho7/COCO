package com.ssafy.coco.data;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@DynamicInsert
@Getter
@NoArgsConstructor
@Entity
@ToString
public class Member {
	@Id
	@Column(name = "user_id")
	private String id;
	@Column(length = 32, nullable = false)
	private String password;
	@Column(length = 16, nullable = false)
	private String name;
	@Column(length = 64, nullable = false)
	private String email;
	@Column(length = 10)
	@ColumnDefault("user")

	private String role;
	@ColumnDefault("0")
	private Integer rating;
	@CreationTimestamp
	private LocalDateTime regTime;

	private LocalDateTime delFlag;

	@Builder
	public Member(String id, String password, String name, String email) {
		this.id = id;
		this.password = password;
		this.name = name;
		this.email = email;
	}

	public void UpdateInfo(String password, String name, String email) {
		this.password = password;
		this.name = name;
		this.email = email;
	}

	public void UpdateRating(Integer amount) {
		this.rating += amount;
	}

	public void DeleteMember(LocalDateTime time) {
		this.delFlag = time;
	}
}
