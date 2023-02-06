package com.ssafy.cocoshop.items.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.cocoshop.items.data.Item;
import com.ssafy.cocoshop.items.data.ItemRepository;
import com.ssafy.cocoshop.items.dto.ItemRegisterRequestDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService {
	private final ItemRepository itemRepository;

	public List<Item> getItemsByItemName(String itemName){
		return itemRepository.findByItemNameContaining(itemName);
	}

	public Item getItemById(long id){
		return itemRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 구매상품을 찾을 수 없습니다."));
	}

	public List<Item> getItemsByAuthorName(String authorName){
		return itemRepository.findByAuthorNameContaining(authorName);
	}

	public List<Item> getItemsByPriceBetween(int startPrice, int endPrice){
		return itemRepository.findByPriceBetween(startPrice, endPrice);
	}

	public List<Item> getAllItems(){
		return itemRepository.findAll();
	}

	public long registerItem(ItemRegisterRequestDto requestDto){
		return itemRepository.save(requestDto.toEntity()).getId();
	}

}
