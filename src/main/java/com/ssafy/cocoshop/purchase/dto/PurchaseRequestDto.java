package com.ssafy.cocoshop.purchase.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class PurchaseRequestDto {
	private String userId;

	private int itemNo;
}
