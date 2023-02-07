package com.ssafy.cocoshop.purchase.service;

import java.util.ArrayList;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.cocoshop.items.data.Item;
import com.ssafy.cocoshop.items.service.ItemService;
import com.ssafy.cocoshop.purchase.data.PurchaseInfo;
import com.ssafy.cocoshop.purchase.data.PurchaseInfoRepository;
import com.ssafy.cocoshop.purchase.dto.PurchaseRequestDto;
import com.ssafy.cocoshop.utils.members.service.MemberService;
import com.ssafy.cocoshop.utils.tokens.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

	private final PurchaseInfoRepository purchaseInfoRepository;

	private final ItemService itemService;

	private final JwtTokenService jwtTokenService;

	private final MemberService memberService;

	@Transactional
	public Optional<PurchaseInfo> purchaseItem(PurchaseRequestDto requestDto, String accessToken) {
		if (jwtTokenService.isValidRequest(requestDto.getUserId(), accessToken)) {
			System.out.println(requestDto);
			Item targetItem = itemService.getItemById(requestDto.getItemNo());
			PurchaseInfo purchaseInfo = purchaseInfoRepository.findById(requestDto.getUserId())
				.orElse(PurchaseInfo.builder()
					.userId(requestDto.getUserId()).purchaseList(new ArrayList<>()).build());
			if (targetItem.getSellEndTime() != null) {
				throw new RuntimeException("판매가 종료된 아이콘입니다.");
			}
			if (!purchaseInfo.getPurchaseList().contains(requestDto.getItemNo())) {
				memberService.updatePointByUsername(requestDto.getUserId(), -targetItem.getPrice());
				purchaseInfo.getPurchaseList().add(requestDto.getItemNo());
				purchaseInfoRepository.save(purchaseInfo);
				targetItem.addBuyCount();
			} else {
				throw new RuntimeException("이미 구매한 아이콘입니다.");
			}
			return purchaseInfoRepository.findById(requestDto.getUserId());
		}
		return Optional.empty();
	}
}
