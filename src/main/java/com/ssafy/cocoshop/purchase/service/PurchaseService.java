package com.ssafy.cocoshop.purchase.service;

import java.util.ArrayList;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

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
			int amount = itemService.getItemById(requestDto.getItemNo()).getPrice();
			memberService.updatePointByUsername(requestDto.getUserId(), -amount);
			PurchaseInfo purchaseInfo = purchaseInfoRepository.findById(requestDto.getUserId())
				.orElse(PurchaseInfo.builder()
					.userId(requestDto.getUserId()).purchaseList(new ArrayList<>()).build());
			if (!purchaseInfo.getPurchaseList().contains(requestDto.getItemNo())) {
				purchaseInfo.getPurchaseList().add(requestDto.getItemNo());
				purchaseInfoRepository.save(purchaseInfo);
			} else {
				throw new RuntimeException("이미 구매한 물품입니다.");
			}
			System.out.println(purchaseInfo.getPurchaseList());
			return purchaseInfoRepository.findById(requestDto.getUserId());
		}
		return Optional.empty();
	}
}
