package com.ssafy.cocoshop.purchase.data;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseInfoRepository extends MongoRepository<PurchaseInfo, String> {
	List<Integer> findPurchaseListByUserId(String userId);
}
