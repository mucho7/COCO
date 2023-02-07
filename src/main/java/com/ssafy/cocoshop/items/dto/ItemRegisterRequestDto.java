package com.ssafy.cocoshop.items.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ItemRegisterRequestDto {
	private String itemName;
	private int price;
	private String authorName;
}
