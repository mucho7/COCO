package com.ssafy.cocoshop.items.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.cocoshop.items.data.Item;
import com.ssafy.cocoshop.items.data.ItemRepository;
import com.ssafy.cocoshop.items.dto.ItemRegisterRequestDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService {
	private final ItemRepository itemRepository;

	public List<Item> getItemsByItemName(String itemName) {
		return itemRepository.findByItemNameContaining(itemName);
	}

	public Item getItemById(long id) {
		return itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 구매상품을 찾을 수 없습니다."));
	}

	public List<Item> getItemsByAuthorName(String authorName) {
		return itemRepository.findByAuthorNameContaining(authorName);
	}

	public List<Item> getItemsByPriceBetween(int startPrice, int endPrice) {
		return itemRepository.findByPriceBetween(startPrice, endPrice);
	}

	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	// 파일 업로드 관련 레퍼런스 코드
	// https://velog.io/@rladuswl/8-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%84%B0%EB%94%94-%EC%87%BC%ED%95%91%EB%AA%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%81%ED%92%88-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%EC%99%80-thymeleaf
	public long registerItem(ItemRegisterRequestDto requestDto, MultipartFile iconFile) throws Exception {
		String originalType = iconFile.getContentType();
		String fileType = originalType.substring(originalType.lastIndexOf("/") + 1);

		String storePath = System.getProperty("user.dir") + "/src/main/resources/static/icons";

		UUID uuid = UUID.randomUUID();
		String storedFileName = uuid + "." + fileType;

		File saveFile = new File(storePath, storedFileName);
		iconFile.transferTo(saveFile);
		return itemRepository.save(Item.builder()
			.itemName(requestDto.getItemName())
			.price(requestDto.getPrice())
			.authorName(requestDto.getAuthorName())
			.storedFileName(storedFileName)
			.storedFilePath(storePath)
			.buyCount(0)
			.build()).getId();
	}

}
