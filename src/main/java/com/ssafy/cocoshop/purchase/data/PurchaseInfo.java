package com.ssafy.cocoshop.purchase.data;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "purchaseList")
@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class PurchaseInfo {
	@Id
	private String userId;

	private List<Integer> purchaseList;

}
