package com.ssafy.cocoshop.items.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.cocoshop.items.data.Item;
import com.ssafy.cocoshop.items.dto.ItemRegisterRequestDto;
import com.ssafy.cocoshop.items.service.ItemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@SuppressWarnings("checkstyle:RegexpMultiline")
@Api(tags = "상품 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/shopApi/item")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
		@RequestParam(value = "start_price", required = false) @ApiParam(value = "검색 조건 중 상품 이름") String startPriceString,
		@RequestParam(value = "end_price", required = false) @ApiParam(value = "검색 조건 중 상품 이름") String endPriceString) {
		if (itemName != null && !itemName.equals("")) {
			return itemService.getItemsByItemName(itemName);
		}
		if (authorName != null && !authorName.equals("")) {
			return itemService.getItemsByAuthorName(authorName);
		}
		int startPrice =
			startPriceString == null || startPriceString.equals("") ? -1 : Integer.parseInt(startPriceString);
		int endPrice = endPriceString == null || endPriceString.equals("") ? -1 : Integer.parseInt(endPriceString);
		if (startPrice != -1) {
			if (endPrice != -1) {
				return itemService.getItemsByPriceBetween(startPrice, endPrice);
			} else {
				return itemService.getItemsByPriceBetween(startPrice, Integer.MAX_VALUE);
			}
		} else if (endPrice != -1) {
			return itemService.getItemsByPriceBetween(0, endPrice);
		}
		return itemService.getAllItems();
	}

	// 파일 이미지 업로드 관련 참고
	// https://velog.io/@pyo-sh/Spring-Boot-%ED%8C%8C%EC%9D%BC%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
	@ApiOperation(value = "상품 등록", notes = "새로운 구매 가능 아이템을 평판점수 상점에 등록합니다.")
	@PostMapping(consumes = {"multipart/form-data"})
	public long registerItem(@RequestPart MultipartFile iconImage, @ModelAttribute ItemRegisterRequestDto requestDto)
		throws Exception {
		System.out.println(requestDto);
		return itemService.registerItem(requestDto, iconImage);
	}

}
