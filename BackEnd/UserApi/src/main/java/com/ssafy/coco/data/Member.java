package com.ssafy.coco.data;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@DynamicInsert
@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
public class Member implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 32, nullable = false)
	private String userId;
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
	public Member(String userId, String password, String name, String email) {
		this.userId = userId;
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

	// 아래 함수들은 UserDetails를 상속받기 때문에 어쩔 수 없이 오버라이드한 메소드.
	// 필요 없을 경우 상속을 제거하고 아래 함수들은 빼도 될 것 같다.

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return userId;
	}

	@Override
	public boolean isAccountNonExpired() {
		return delFlag != null;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
