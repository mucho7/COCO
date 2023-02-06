package com.ssafy.cocoshop.items.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemRepository extends JpaRepository<Item, Long> {

	List<Item> findByPriceBetween(int startPrice, int endPrice);

	List<Item> findByItemNameContaining(String itemName);

	List<Item> findByAuthorNameContaining(String authorName);
}
