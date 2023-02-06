package com.ssafy.cocoshop.items.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ItemRegisterRequestDto {
	private String itemName;
	private long price;
	private String authorName;
}
