package com.ssafy.cocoshop.items.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.cocoshop.items.data.Item;
import com.ssafy.cocoshop.items.dto.ItemRegisterRequestDto;
import com.ssafy.cocoshop.items.service.ItemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@SuppressWarnings("checkstyle:RegexpMultiline")
@Api(tags = "상품 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/itemshop/item")
@CrossOrigin("*")
public class ItemController {

	private final ItemService itemService;

	@ApiOperation(value = "Hello", notes = "CI/CD 정상 동작 테스트를 위한 API")
	@GetMapping("/hello")
	public String hello() {
		return "itemshop->item";
	}

	@ApiOperation(value = "상품 상세 정보", notes = "상품 ID에 해당하는 아이콘의 상세 정보를 가져옵니다.")
	@GetMapping("/{id}")
	public Item getItemById(@PathVariable @ApiParam(value = "상세정보를 조회하려는 상품 번호", required = true) long id) {
		return itemService.getItemById(id);
	}

	@ApiOperation(value = "상품 이름 검색", notes = "사용자가 검색창에서 검색한 이름에 해당하는 상품 리스트를 가져옵니다. 만약 검색조건이 하나도 없을 경우, 전체 리스트를 반환합니다.")
	@GetMapping
	public List<Item> search(
		@RequestParam(value = "item_name", required = false) @ApiParam(value = "검색 조건 중 상품 이름") String itemName,
		@RequestParam(value = "author_name", required = false) @ApiParam(value = "검색 조건 중 상품 제작자 이름") String authorName,
		@RequestParam(value = "start_price", required = false) @ApiParam(value = "검색 조건 중 상품 이름") Integer startPrice,
		@RequestParam(value = "end_price", required = false) @ApiParam(value = "검색 조건 중 상품 이름") Integer endPrice) {
		if (itemName != null) {
			return itemService.getItemsByItemName(itemName);
		}
		if (authorName != null) {
			return itemService.getItemsByAuthorName(authorName);
		}
		if (startPrice != null) {
			if (endPrice != null) {
				return itemService.getItemsByPriceBetween(startPrice, endPrice);
			} else {
				return itemService.getItemsByPriceBetween(startPrice, Integer.MAX_VALUE);
			}
		} else if (endPrice != null) {
			return itemService.getItemsByPriceBetween(0, endPrice);
		}
		return itemService.getAllItems();
	}

	@ApiOperation(value = "상품 등록", notes = "새로운 구매 가능 아이템을 평판점수 상점에 등록합니다.")
	@PostMapping
	public long registerItem(
		@RequestBody @ApiParam(value = "상점에 등록할 새로운 물품 정보", required = true) ItemRegisterRequestDto requestDto) {
		return itemService.registerItem(requestDto);
	}

}
