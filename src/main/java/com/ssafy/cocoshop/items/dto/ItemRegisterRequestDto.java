package com.ssafy.cocoshop.items.dto;

import com.ssafy.cocoshop.items.data.Item;

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
	private String itemFileName;

	public Item toEntity() {
		return Item.builder()
			.itemName(itemName)
			.price(price)
			.authorName(authorName != null ? authorName : "CoCo 아이콘 팀")
			.itemFileName(itemFileName)
			.build();
	}
}
